const { Router } = require("express");
const { conn } = require("../libs/sequelize");
const sequelize = conn;
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    let { schemaName, name, channelId } = req.body;
    console.log(req.body);
    // schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    const sql = `
              INSERT INTO ${schemaName.toLowerCase()}.categories (name, "channelId") VALUES('${name}', ${channelId});
              `;
    const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let { schemaName, categoryId } = req.query;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    if (!categoryId) {
      const sql = `
                SELECT cat.name AS "catName", cat.id AS "catId", cha.id AS "chaId", cha.name AS "chaName", 
                cha.isprivate, cha.status AS "channelStatus", cat.status AS "categoryStatus"
                FROM ${schemaName}.categories AS cat 
                LEFT JOIN ${schemaName}.channels AS cha 
                ON cat."channelId" = cha.id`;
               console.log('estoy?')
        const result = await sequelize.query(sql, {
          type: sequelize.QueryTypes.SELECT,
        });
        // console.log(result, '<=soy result')
        return res.status(200).json(result);
    } else {
      const sql = `
                SELECT cat.name AS "catName", cat.id AS "catId", cha.id AS "chaId", cha.name AS "chaName", 
                cha.isprivate, cat.status AS "categoryStatus"
                FROM ${schemaName}.categories AS cat 
                LEFT JOIN ${schemaName}.channels AS cha 
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

router.get("/bychannel", async (req, res, next) => {
  let { schemaName, channelId } = req.query;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
  //   const sql = `
  // SELECT * FROM ${schemaName}.categories AS cat
  // WHERE "channelId" = '${channelId}'
  // `;
  const sql = `
  SELECT cat.name AS "catName", cat.id AS "catId", cha.id AS "chaId", cha.name AS "chaName", 
  cha.isprivate, cat.status AS "categoryStatus"
  FROM ${schemaName}.categories AS cat 
  LEFT JOIN ${schemaName}.channels AS cha 
  ON cat."channelId" = cha.id
  WHERE cha.id = '${channelId}'
  `
  const result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  })

  // result = result?.filter(category => category.categoryStatus === 'active')
  return res.status(200).json(result)
} catch(error) {
  next(error)
}
})

router.put("/", async (req, res, next) => {
  let { schemaName, categoryId, newName } = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    const sql = `UPDATE ${schemaName}.categories SET name='${newName}' WHERE id='${categoryId}'`;
    const result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/status", async (req, res, next) => {
  let { schemaName, categoryId, status } = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    let sql = `
      UPDATE ${schemaName}.categories 
      SET status='${status}'
      WHERE id = '${categoryId}'
      `;

    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(200).json({ message: "Status updated succesfully" });
  } catch (error) {
    next(error);
  }
});

// router.delete('/', async (req, res, next) => {
//   try{
//       let {schemaName, name} = req.body;
//       schemaName = schemaName.replace(/\s/g, "").toLowerCase();
//       const sql = `
//       SELECT * FROM ${schemaName}.categories WHERE name='${name}'
//       `;
//       const respond = await sequelize.query(sql, {
//           type: sequelize.QueryTypes.INSERT
//         })

//       if (respond[1] === 1) {
//           const sql2 = `
//           DELETE FROM ${schemaName}.categories WHERE name='${name}'
//           `;
//           await sequelize.query(sql2, {
//               type: sequelize.QueryTypes.INSERT
//           })
//           res.json({message:'Category deleted successfully'})
//       } else {
//           res.json({message:'Could not delete category'})
//       }
//   } catch(error) {
//       next(error)
//   }
// })

module.exports = router;
