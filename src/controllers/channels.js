const { Router } = require('express');
const router = Router();
const {conn, Users} = require('../libs/sequelize');
const sequelize = conn

router.post('/', async function(req, res, next){
    const { schemaName, name, isprivate, description } = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        const sql = `INSERT INTO ${schemaName}.channels (name, isprivate, description)
                    VALUES ('${name}', '${isprivate}', '${description}')`
            await sequelize.query(sql, {
                type: sequelize.QueryTypes.INSERT
            })    
        res.status(200).send('Channel created succesfully')
    } catch (error) {
        res.status(400).json({message:error})
    }
});


router.get('/', async (req, res, next) => {
    const {schemaName} = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        const sql = `SELECT * FROM ${schemaName}.channels`
            const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
            })
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({message:error})
    }
})

router.put('/', async (req, res, next) => {
    const {schemaName, oldName, newName} = req.body;
    schemaName = schemaName.replace(/\s/g, "").toLowerCase();
    try {
        const sql = `UPDATE ${schemaName}.channels SET name=${newName} WHERE name=${oldName}`
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
        SELECT * FROM ${schemaName}.channels WHERE name=${name}  
        `;
        const respond = await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT
          })
    
        if (respond[1] === 1) {
            const sql2 = `
            DELETE * FROM ${schemaName}.channels WHERE name=${name}
            `;
            await sequelize.query(sql2, {
                type: sequelize.QueryTypes.INSERT
            })
            res.json({message:'Channel deleted successfully'})
        } else {
            res.json({message:'Could not delete channel'})
        }
    } catch(error) {
        next(error)
    }
})


module.exports = router;