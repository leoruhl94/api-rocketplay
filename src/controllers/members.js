const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.get("/", async (req, res, next) => {
    let { schemaName } = req.query
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        const sql = `
        SELECT * FROM ${schemaName}.members
        `

        const members = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        })
        
        res.status(200).json(members);
    } catch(error) {
        next(error)
    }
})

router.put("/", async (req, res, next) => {
    try {
        let { schemaName, newUserType, memberId } = req.body
        schemaName = schemaName.replace(/\s/g, "").toLowerCase();
        const sql = `
        UPDATE ${schemaName}.members SET usertype='${newUserType}' WHERE id='${memberId}'
        `; 
        const respond = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT
        })
        res.status(200).json({message: 'Member succesfully updated'})
    } catch(error) {
        next(error)
    }
})

router.delete("/", async (req, res, next) => {
    let { schemaName, memberId } = req.body
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        const sql = `
        SELECT * FROM ${schemaName}.members 
        WHERE id = '${memberId}' 
        `

        const member = await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT
        })
        console.log(member)
        if(member[1] === 1) {
            const sqlDelete = `
            DELETE FROM ${schemaName}.members
            WHERE id = '${memberId}'
            `

            await sequelize.query(sqlDelete, {
                type: sequelize.QueryTypes.INSERT
            })
            res.status(200).json({message: "Member succesfully deleted"})
        } else {
            res.json({message: "Could not delete the member :c"})
        }
            
    } catch(error) {
        next(error)
    }
})

module.exports = router;