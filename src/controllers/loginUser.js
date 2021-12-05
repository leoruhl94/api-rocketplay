const Router = require('express')
const router = Router();
const {conn, Users} = require('../libs/sequelize');
const sequelize = conn;
const OAuth2Data = require("../../googleYoutube.json")
const {google} = require("googleapis")


router.post('/', async (req, res, next)=> {
    try{
        const {code} = req.body
        console.log(code)
        const oAuthClient = new google.auth.OAuth2(
                OAuth2Data.web.client_id,
                OAuth2Data.web.client_secret,
                OAuth2Data.web.redirect_uris
        )
        console.log("OAUTH", oAuthClient)
        oAuthClient.getToken(code, function(err, tokens){
            if(err) throw err
            console.log('successfully authenticated')
            //console.log(tokens)
            oAuthClient.setCredentials(tokens)
            return res.json({
                data: tokens
            })
        })
    } catch (error) {
        next(error)
    }
    

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
})

router.get('/',  async (req, res, next)=> {
    
    try {
        const {email} = req.query
        const userBool = await Users.findOne({
            where: {mail: email}
        })

        res.status(200).json({isRegistered: !!userBool})

    }  catch (error) {
        res.status(400).json({message:error})
    } 

})

module.exports = router
