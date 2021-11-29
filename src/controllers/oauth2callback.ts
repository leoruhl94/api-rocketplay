import {Response, Request, Router, NextFunction} from 'express';
const { oAuthClient, authed } = require('./loginUser')
const {google} = require("googleapis")
const {conn, Users} = require('../libs/sequelize');

const router = Router();

router.get('/', async(req, res) => {
    try {
        const code = req.query.code
        console.log('comienza auth, codigo: ', code)
        if(code){
             oAuthClient.getToken(code, function(err, tokens){
                if(err) throw err
                console.log('successfully authenticated')
                oAuthClient.setCredentials(tokens)
                const oauth = google.oauth2({
                    version: 'v2',
                    auth: oAuthClient
                })
            
                oauth.userinfo.get(async function(err, response){
                    try {
                        console.log(response.data)
                        const userBool = await Users.findOne({
                            where: {mail: response.data.email}
                        })
                        if (!userBool) {
                            const newUser = await Users.create({
                                name: response.data.name,
                                mail: response.data.email
                            })
                            return res.status(200).send(newUser)
                        }
                        return res.status(200).send(userBool)
                    } catch (error) {
                        res.status(400).json({message:error})
                    }
                })
            })
        }
    
    } catch (err) {
        res.status(400).json({message:err})
    }


})

module.exports = router