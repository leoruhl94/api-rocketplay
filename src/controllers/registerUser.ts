import {Response, Request, Router, NextFunction} from 'express';
import validateUser from '../services/validateUser';

const router = Router();
const { conn } = require('../libs/sequelize');
const sequelize = conn;

router.post('/', async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const {schemaName, name, mail, password, userType} = req.body;
        const result = validateUser(name, password, mail, userType);
        if(result === "success"){
            const sql = `
            INSERT INTO ${schemaName.toLowerCase()}.Users (name, password, mail, userType) VALUES('${name}', '${password}', '${mail}', '${userType}')
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