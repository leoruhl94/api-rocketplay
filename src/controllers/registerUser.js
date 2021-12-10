const { Router } = require('express');
const validateUser = require ('../services/validateUser');

const router = Router();
const { conn } = require('../libs/sequelize');
const sequelize = conn;

router.post('/', async (req, res, next)=> {
    try{
        const {schemaName, name, mail, userType} = req.body;
        if(true){
            const sql = `
            INSERT INTO ${schemaName.toLowerCase()}.users (name, mail, userType) VALUES('${name}', '${mail}', '${userType}')
            `
            await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT
            })
            res.status(200).json({message: "Success"})
        }else{
            res.status(400).json({message:result})
        }
    }catch(error){
        res.status(400).json({message:error})
    }
})
module.exports = router;