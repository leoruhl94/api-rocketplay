const { Router } = require('express');
const { conn } = require("../libs/sequelize");
const sequelize = conn;
const router = Router();

router.post("/",async (req, res, next) => {
    try {
      let { schemaName, name, channelId } = req.body;
      schemaName = schemaName.replace(/\s/g, "").toLowerCase();
      const sql = `
              INSERT INTO ${schemaName.toLowerCase()}.categories (name, "channelId") VALUES('${name}', ${channelId});
              `;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
});


router.get("/",async (req, res, next) => {
    try {
      let { schemaName, categoryId } = req.query;
      schemaName = schemaName.replace(/\s/g, "").toLowerCase();
      if(!categoryId) {
        const sql = `
                SELECT cat.name AS "catName", cat.id AS "catId", cha.id AS "chaId", cha.name AS "chaName", cha.description, cha.isprivate 
                FROM ${schemaName}.categories cat 
                LEFT JOIN ${schemaName}.channels cha 
                ON cat."channelId" = cha.id
                `;
        const result = await sequelize.query(sql, {
          type: sequelize.QueryTypes.SELECT,
        });
        return res.status(200).json(result);
      } else {
        const sql = `
                SELECT cat.name AS "catName", cat.id AS "catId", cha.id AS "chaId", cha.name AS "chaName", cha.description, cha.isprivate 
                FROM ${schemaName}.categories cat 
                LEFT JOIN ${schemaName}.channels cha 
                ON cat."channelId" = cha.id
                WHERE cat.id = '${categoryId}'
                `;
        const result = await sequelize.query(sql, {
          type: sequelize.QueryTypes.SELECT,
        });
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
});

router.put('/', async (req, res, next) => {
  let {schemaName, oldName, newName} = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
      const sql = `UPDATE ${schemaName}.categories SET name='${newName}' WHERE name='${oldName}'`
      const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
      })
      res.status(200).json(result);
  } catch(error) {
      next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try{
      let {schemaName, name} = req.body;
      schemaName = schemaName.replace(/\s/g, "").toLowerCase();
      const sql = `
      SELECT * FROM ${schemaName}.categories WHERE name='${name}' 
      `;
      const respond = await sequelize.query(sql, {
          type: sequelize.QueryTypes.INSERT
        })
  
      if (respond[1] === 1) {
          const sql2 = `
          DELETE FROM ${schemaName}.categories WHERE name='${name}'
          `;
          await sequelize.query(sql2, {
              type: sequelize.QueryTypes.INSERT
          })
          res.json({message:'Category deleted successfully'})
      } else {
          res.json({message:'Could not delete category'})
      }
  } catch(error) {
      next(error)
  }
})

module.exports = router;