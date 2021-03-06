const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.get("/", async (req, res, next) => {
  try {
    let { schemaName, title } = req.query;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    let sql;
    if (!title) {
      sql = `
        SELECT v.title, v.link, v.description, v.channelname AS workspace, v.channelavatar, v.id AS videoid, v.thumbnail, 
        m.name AS username, m.id AS "memberId", m.mail AS usermail, m.userType, cat.name AS category, v.status AS "videoStatus", v."createdAt"
        FROM ${schemaName}.videos AS v
        LEFT JOIN ${schemaName}.members AS m ON v."memberId" = m.id
        LEFT JOIN ${schemaName}.categories AS cat ON v."categoryId" = cat.id
        `;
    } else {
      sql = `
            SELECT v.title, v.link, v.description, v.channelname AS workspace, v.channelavatar, v.id AS videoid, v.thumbnail, 
            m.name AS username, m.mail AS usermail, m.userType, cat.name AS category, v.status AS "videoStatus", v."createdAt"
            FROM ${schemaName}.videos AS v
            LEFT JOIN ${schemaName}.members AS m ON v."memberId" = m.id
            LEFT JOIN ${schemaName}.categories AS cat ON v."categoryId" = cat.id
            WHERE (v.title = '${title}')
            `;
    }

    let videos = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

router.get("/category", async (req, res, next) => {
  let { categoryId, schemaName } = req.query;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    const sql = `
        SELECT * FROM ${schemaName}.videos AS v
        WHERE "categoryId" = '${categoryId}'
        ORDER BY title ASC
        `

    let videos = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
});

// router.put("/delete", async (req, res, next) => {
//     try {
//       const { title, author } = req.body
//       const schemaName = author.replace(/\s/g, "").toLowerCase();
//       const sql = `
//       SELECT * FROM ${schemaName}.videos WHERE title=${title}, author=${author}
//       `;
//       const respond = await sequelize.query(sql, {
//         type: sequelize.QueryTypes.INSERT
//         })

//         if (respond[1] === 1) {
//         const sql2 = `
//         DELETE * FROM ${schemaName}.videos WHERE title=${title}, author=${author}
//         `;
//         await sequelize.query(sql2, {
//         type: sequelize.QueryTypes.INSERT
//         })
//         res.json({message:'Video deleted successfully'})
//         } else {
//           res.json({message:'Could not delete video'})
//         }
//     }catch(error){
//       next(error)
//     }
// })

router.put("/status", async (req, res, next) => {
  let { schemaName, id, status } = req.body;
  schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  try {
    const sql = `
        UPDATE ${schemaName}.videos
        SET status = '${status}'
        WHERE id = '${id}'
        `;

    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.json({ message: "Status updated succesfully" });
  } catch (error) {
    next(error);
  }
});

router.put("/editTitle", async (req, res, next) => {
  console.log(req.body)
  try {
    let { schemaName, newTitle, id } = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    const sql = `
          UPDATE ${schemaName}.videos
          SET title = '${newTitle}'
          WHERE id = '${id}'
          `;
  
    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.json({ message: "Title updated succesfully" });

  } catch (error) {
    next(error)
  }
})

router.put("/editDescription", async (req, res, next) => {
  console.log(req.body)
  try {
    let { schemaName, newDescription, id } = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    const sql = `
          UPDATE ${schemaName}.videos
          SET description = '${newDescription}'
          WHERE id = '${id}'
          `;
  
    await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.json({ message: "Description updated succesfully" });

  } catch (error) {
    next(error)
  }
})

router.get("/id", async (req, res, next) => {
  try {
    let { schemaName, videoId } = req.query;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
  
    let sql = `
        SELECT v.title, v.link, v.description, v.channelname AS workspace, v.channelavatar, v.id AS videoid, v.thumbnail, 
        m.name AS username, m.mail AS usermail, m.userType, cat.name AS category, v.status AS "videoStatus", v."createdAt"
        FROM ${schemaName}.videos AS v
        LEFT JOIN ${schemaName}.members AS m ON v."memberId" = m.id
        LEFT JOIN ${schemaName}.categories AS cat ON v."categoryId" = cat.id
        WHERE (v.id = '${videoId}')
      `;

    let videos = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
