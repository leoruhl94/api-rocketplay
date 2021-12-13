const { Router } = require("express");
const router = Router();
const { conn, Users } = require("../libs/sequelize");
const config = require("../config/config.js");
const { default: axios } = require("axios");
const sequelize = conn;

const URL_BASE =
  config.env === "production"
    ? "https://api-rocketplay.herokuapp.com"
    : "http://localhost:3002";

router.post("/", async function (req, res, next) {
  let { schemaName, name, isprivate, description } = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    const sql = `INSERT INTO ${schemaName}.channels (name, isprivate, description)
                    VALUES ('${name}', '${isprivate}', '${description}')`;
    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    const sqlChannel = `
        SELECT * FROM ${schemaName}.channels WHERE name = '${name}'
        `;
    const channel = await sequelize.query(sqlChannel, {
      type: sequelize.QueryTypes.SELECT,
    });
    const sqlCategory = `
        INSERT INTO ${schemaName}.categories (name, "channelId")
        VALUES ('Uncategorized', '${channel[0].id}')
        `;

    await sequelize.query(sqlCategory, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).send("Channel created succesfully");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  let { schemaName, channelId } = req.query;
  if (!schemaName) return res.status(400).json({message: "U have to send me the schema name!"})
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  
  try {
    const allSchemas = await sequelize.showAllSchemas()
  
    if(!allSchemas.includes(schemaName)) return res.status(400).json({message: "Schema not found!"})
    if (!channelId) {
      const sql = `SELECT * FROM ${schemaName}.channels`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return res.status(200).json(result);
    } else {
      const sql = `SELECT * FROM ${schemaName}.channels WHERE id = '${channelId}'`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  let { schemaName, oldName, newName } = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    const sql = `UPDATE ${schemaName}.channels SET name='${newName}' WHERE name='${oldName}'`;
    const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    let { schemaName, name } = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    const sql = `
        SELECT * FROM ${schemaName}.channels WHERE name='${name}'  
        `;
    const respond = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    if (respond[1] === 1) {
      const sql2 = `
            DELETE FROM ${schemaName}.channels WHERE name='${name}'
            `;
      await sequelize.query(sql2, {
        type: sequelize.QueryTypes.INSERT,
      });
      res.json({ message: "Channel deleted successfully" });
    } else {
      res.json({ message: "Could not delete channel" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
