const { Router } = require('express');
const {conn, Users} = require('../libs/sequelize')
const router = Router();
router.post('/', async (req, res, next)=> {
    const {mail, password} = req.body;
    const user = await Users.findOne({
        where:{
            mail,
            password
        }
    })
    if(user){
        res.status(200).json({isUser:true})
    }else{
        res.status(400).json({isUser:false})
    }
})
module.exports = router;