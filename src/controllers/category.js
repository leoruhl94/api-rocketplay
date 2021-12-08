const { Router } = require('express');
const { conn } = require("../libs/sequelize");
const sequelize = conn;
const router = Router();

router.post("/",async (req, res, next) => {
        try {
          const { schemaName, name } = req.body;
          schemaName = schemaName.replace(/\s/g, "").toLowerCase();
          const sql = `
                  INSERT INTO ${schemaName.toLowerCase()}.categories(name) VALUES('${name}');
                  `;
          const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
          });
          res.status(200).json(result);
        } catch (error) {
          res.status(400).json({ message: error });
        }
      });
router.get("/",async (req, res, next) => {
    try {
      const { schemaName } = req.body;
      schemaName = schemaName.replace(/\s/g, "").toLowerCase();
      const sql = `
              SELECT * FROM ${schemaName.toLowerCase()}.categories
              `;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error });
    }
});

router.put('/', async (req, res, next) => {
  const {schemaName, oldName, newName} = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
      const sql = `UPDATE ${schemaName}.categories SET name=${newName} WHERE name=${oldName}`
      const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
      })
      res.status(200).json(result);
  } catch(error) {
      res.status(400).json({message:error})
  }
})

router.delete('/', async (req, res, next) => {
  try{
      const {schemaName, name} = req.body;
      schemaName = schemaName.replace(/\s/g, "").toLowerCase();
      const sql = `
      SELECT * FROM ${schemaName}.categories WHERE name=${name}  
      `;
      const respond = await sequelize.query(sql, {
          type: sequelize.QueryTypes.INSERT
        })
  
      if (respond[1] === 1) {
          const sql2 = `
          DELETE * FROM ${schemaName}.categories WHERE name=${name}
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