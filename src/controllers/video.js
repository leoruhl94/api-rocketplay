const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.get("/", async (req, res, next) => {
	try {
		let { schemaName, title } = req.body;
		title = title && title.replace(/\s+/g, "+");
		schemaName = schemaName.replace(/\s/g, "").toLowerCase();
		let sql;
		if (!title) {
			sql = `
        SELECT v.title, v.description, v.channelname AS workspace, v.channelavatar, v.id AS videoid, v.thumbnail, m.name AS username, m.mail AS usermail, m.userType, cat.name AS category
        FROM ${schemaName}.videos AS v
        LEFT JOIN ${schemaName}.members AS m ON v."memberId" = m.id
        LEFT JOIN ${schemaName}.categories AS cat ON v."categoryId" = cat.id
        `;
		} else {
			sql = `
            SELECT v.title, v.description, v.channelname AS workspace, v.channelavatar, v.id AS videoid, v.thumbnail, m.name AS username, m.mail AS usermail, m.userType, cat.name AS category
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

  
router.put("/delete", async (req, res, next) => {
    try {
      const { title, author } = req.body
      const schemaName = author.replace(/\s/g, "").toLowerCase();
      const sql = `
      SELECT * FROM ${schemaName}.videos WHERE title=${title}, author=${author}    
      `;
      const respond = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT
        })
  
        if (respond[1] === 1) {
        const sql2 = `
        DELETE * FROM ${schemaName}.videos WHERE title=${title}, author=${author}
        `;
        await sequelize.query(sql2, {
        type: sequelize.QueryTypes.INSERT
        })
        res.json({message:'Video deleted successfully'})
        } else {
          res.json({message:'Could not delete video'})
        }
    }catch(error){
      next(error)
    }
})

module.exports = router;