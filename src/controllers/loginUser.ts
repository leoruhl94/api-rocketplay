import {Response, Request, Router, NextFunction} from 'express';
const router = Router();
const {conn, Users} = require('../libs/sequelize');
const sequelize = conn;
router.post('/', async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const {schemaName,mail, password} = req.body;
        // Comprobar con el front donde va a quedar el usuario cuando se logea
        const user = await Users.findOne({
            where:{
                name:schemaName
            }
        })
        // 
        if(user){
            const sql = `
            SELECT* FROM ${schemaName.toLowerCase()}.Users WHERE mail = '${mail}' AND password = '${password}'
            `
            const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
            })
            result?res.status(200).json(result) : res.status(400).json({message:"Credenciales incorrectas"})
        }else{
            res.status(400).json({message:"Empresa no registrada"})
        }
        }catch(error){
            res.status(400).json({message:error})
        }
})
module.exports = router;