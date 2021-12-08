const { Router } = require('express');
const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.post("/", async function(req, res, next) {
  try {
    const { author, nameTag } = req.body;
    const schemaName = author.replace(/\s/g, "").toLowerCase();
    const sql = `
            INSERT INTO ${schemaName.toLowerCase()}.tags (name) VALUES('${nameTag}')
            `;
    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).send("Tag created succesfully");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { schemaName } = req.body;
    const sql = `
            SELECT * FROM ${schemaName.toLowerCase()}.tags
            `;
    const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});



router.put("/", async (req, res, next) => {
  const { author, nameTag, newNameTag } = req.body
  const schemaName = author.replace(/\s/g, "").toLowerCase();
  try {
    const sql = `
    UPDATE ${schemaName}.tags SET name=${newNameTag} WHERE name=${nameTag}`;
    const respond = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT
      })
      res.status(200).json({respond})       
      
  }catch(error){
    res.status(400).json({message:error})
  }
})


router.delete('/', async (req, res, next) => {
    const {author, name} = req.body;
    const schemaName = author.replace(/\s/g, "").toLowerCase();
  try{
      const sql = `
      SELECT * FROM ${schemaName}.tags WHERE name=${name}  
      `;
      const respond = await sequelize.query(sql, {
          type: sequelize.QueryTypes.INSERT
        })
  
      if (respond[1] === 1) {
          const sql2 = `
          DELETE * FROM ${schemaName}.tags WHERE name=${name}
          `;
          await sequelize.query(sql2, {
              type: sequelize.QueryTypes.INSERT
          })
          res.json({message:'Tag deleted successfully'})
      } else {
          res.json({message:'Could not delete tag'})
      }
  } catch(error) {
      next(error)
  }
})







module.exports = router;
