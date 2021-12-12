const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const getTime = require("../services/getTime.js")
const sequelize = conn;

router.post("/", async (req, res, next) => {
    // description - videoId - memberId
    let {description, videoId, schemaName, memberId} = req.body

    let timestamp = getTime()

    try {
        
        let sqlSelect = `
        SELECT * FROM ${schemaName.replace(/\s/g, "").toLowerCase()}.members 
        WHERE id = '${memberId}'
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
    let {videoId, schemaName} = req.query
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        let sql = `
        SELECT c.id AS "commentId", m.name AS "memberName", c.description AS text, v.title AS "videoTitle", v.id AS "videoId", v.channelname, c."createdAt"
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