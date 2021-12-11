const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const getTime = require("../services/getTime.js")
const sequelize = conn;

router.post("/", async (req, res, next) => {
    // description - videoId - memberId
    let {description, videoId, schemaName} = req.body

    let timestamp = getTime()

    try {
        
        let sqlSelect = `
        SELECT * FROM ${schemaName.replace(/\s/g, "").toLowerCase()}.members 
        WHERE name = '${schemaName}'
        `
        
        let member = await sequelize.query(sqlSelect, {
            type: sequelize.QueryTypes.SELECT,
		});
        // console.log(member[0].id)
        schemaName = schemaName.replace(/\s/g, "").toLowerCase();

        let sql = `
        INSERT INTO ${schemaName}.comments (description, "videoId", "memberId", "createdAt", "updatedAt") 
        VALUES ('${description}', '${videoId}', '${member[0].id}', '${timestamp}', '${timestamp}')
        `

        await sequelize.query(sql, {
			type: sequelize.QueryTypes.INSERT,
		});

        res.status(201).json({message: "Comment succesfully created"})

    } catch(error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    let {videoId, schemaName} = req.body
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        let sql = `
        SELECT c.description, c."createdAt", c.id AS "commentId", v.title, v.channelname, m.name
        FROM ${schemaName}.comments AS c
        LEFT JOIN ${schemaName}.videos AS v ON c."videoId" = v.id
        LEFT JOIN ${schemaName}.members AS m ON c."memberId" = m.id
        WHERE v.id = '${videoId}'
        `

        let comments = await sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT,
		});

        res.status(200).json(comments)

    } catch(error) {
        next(error)
    }
})

router.put("/", async (req, res, next) => {
    let {commentId, schemaName} = req.body
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();    

    try {
        let sql = `
        DELETE FROM ${schemaName}.comments WHERE id = '${commentId}'
        `

        await sequelize.query(sql, {
			type: sequelize.QueryTypes.INSERT,
		});

        res.status(200).json({message: "Comment succesfully deleted"})
    } catch(error) {
        next(error)
    }
})

module.exports = router;