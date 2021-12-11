const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.post("/", async (req, res, next) => {
    // memberId - videoId
    let { schemaName, videoId, memberId } = req.body
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        const sql = `
            INSERT INTO ${schemaName}.likes ("videoId", "memberId")
            VALUES ('${videoId}', '${memberId}')
        `
        await sequelize.query(sql, {
			type: sequelize.QueryTypes.INSERT,
		})
        res.status(200).json({message: "Video liked successfully"})
    } catch(error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    let { schemaName, videoId, memberId } = req.body
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        if(memberId){
            const sql = `
                SELECT * FROM ${schemaName}.likes
                WHERE "memberId" = '${memberId}' AND "videoId" = '${videoId}'
            `
            
            let like = await sequelize.query(sql, {
                type: sequelize.QueryTypes.SELECT
            })
            return res.status(200).json(like)
        } else {
            const sql = `
            SELECT * FROM ${schemaName}.likes
            WHERE "videoId" = '${videoId}'
            `

            let like = await sequelize.query(sql, {
                type: sequelize.QueryTypes.INSERT
            })

            return res.status(200).json({likes: like[1]})
        }
    } catch(error) {
        next(error)
    }
})

router.put("/", async (req, res, next) => {
    // let { schemaName, memberId,  }
    try {

    } catch(error) {
        next(error)
    }
})




module.exports = router;