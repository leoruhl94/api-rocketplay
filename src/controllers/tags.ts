import {Response, Request, Router, NextFunction} from 'express';

const router = Router();
const { conn } = require('../libs/sequelize');
const sequelize = conn;

router.post('/', async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const {schemaName, name} = req.body;
        const sql = `
            INSERT INTO ${schemaName.toLowerCase()}.tags (name) VALUES('${name}')
            `
        await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT
        })
        res.status(200).send("Tag created succesfully");
    }catch(error){
        res.status(400).json({message:error})
    }
})

router.get('/', async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const {schemaName} = req.body;
        const sql = `
            SELECT * FROM ${schemaName.toLowerCase()}.tags
            `
            const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
            })
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({message:error})
    }
})

module.exports = router;