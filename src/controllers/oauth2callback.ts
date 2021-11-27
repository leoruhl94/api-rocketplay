import {Response, Request, Router, NextFunction} from 'express';
const { oAuthClient, authed } = require('./loginUser')
const {google} = require("googleapis")
const {conn, Users} = require('../libs/sequelize');

const router = Router();

router.get('/', async(req, res) => {
    const code = req.query.code
    console.log('comienza auth, codigo: ', code)
    if(code){
        oAuthClient.getToken(code, function(err, tokens){
            if(err) throw err
            console.log('successfully authenticated')
            oAuthClient.setCredentials(tokens)
        })
    }


    const oauth = google.oauth2({
        version: 'v2',
        auth: oAuthClient
    })

    oauth.userinfo.get(function(err, response){
        console.log(response)
        console.log(response.data)
        const userBool = Users.findOne({
            where: {email: response.data.email}
        })
        if (!userBool) {
            const newUser = Users.create({
                name: response.data.name,
                email: response.data.email
            })
        }
    })
})

module.exports = router