import {Response, Request, Router, NextFunction} from 'express';
const router = Router();
const {conn, Users} = require('../libs/sequelize');
const sequelize = conn;
const OAuth2Data = require("../../googleYoutube.json")
const {google} = require("googleapis")

let authed = false;

const oAuthClient = new google.auth.OAuth2(
    OAuth2Data.web.client_id,
    OAuth2Data.web.client_secret,
    OAuth2Data.web.redirect_uris[0]
)

router.post('/', async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const {isBusiness} = req.body
        if (isBusiness) {
            const url = oAuthClient.generateAuthUrl({
                access_type: 'offline',
                scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl'
            })
            res.json({url})
        } else {
            const url = oAuthClient.generateAuthUrl({
                access_type: 'offline',
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube'
            })
            res.json({url})
        }


        //generar url de logueo de google
        // else{
        //     const oauth = google.oauth2({
        //         version: 'v2',
        //         auth: oAuthClient
        //     })
        //     //obtener informacion del usuario
        //     oauth.userinfo.get(function(err, response){
        //         console.log(response.data.name)
        //         res.json({msj: 'logged'})
        //     })
        // }








        // const {schemaName,mail, password} = req.body;
        // // Comprobar con el front donde va a quedar el usuario cuando se logea
        // const user = await Users.findOne({
        //     where:{
        //         name:schemaName
        //     }
        // })
        // // 
        // if(user){
        //     const sql = `
        //     SELECT* FROM ${schemaName.toLowerCase()}.Users WHERE mail = '${mail}' AND password = '${password}'
        //     `
        //     const result = await sequelize.query(sql, {
        //     type: sequelize.QueryTypes.SELECT
        //     })
        //     result?res.status(200).json(result) : res.status(400).json({message:"Credenciales incorrectas"})
        // }else{
        //     res.status(400).json({message:"Empresa no registrada"})
        // }
        }catch(error){
            res.status(400).json({message:error})
        }
})

module.exports = {
    loginUser: router,
    authed,
    oAuthClient
};