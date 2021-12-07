const Router = require('express');
const {conn, Users} = require('../libs/sequelize')
const router = Router();
const UsersService = require('../services/usersService')
/////////////////////////////////////////////
let usersService = new UsersService()

router.get('/all', async(req, res, next) => {
    try {
        res.json(await usersService.findAllUsers())
    } catch(error) {
        next(error)
    }
})


router.get('/', async (req, res, next)=> {
    try{
        const {email} = req.query
        const userBool = await Users.findOne({
            where: {mail: email}
        })
        // Si ya estaba creado mando true
        return res.status(200).json({isRegistered: !!userBool})
    } catch (error) {
        res.send(error)
    }
})


router.post("/", async (req, res, next)=> {
    try{
        const {name, email, isBusiness} = req.body
        const newUser = await Users.create({name:name, mail:email, isBusiness:isBusiness})
        res.status(200).json(newUser)
    } catch (error) {
        res.send(error)
    }
})

router.put("/", async (req, res, next) => {
    try {
        const { isBusiness, email } = req.body
        const foundUser = await Users.findOne({
            where: {mail: email}
        })
        await foundUser.update({isBusiness: isBusiness})
        res.status(200).json({isBusiness})
    } catch (error) {
        res.send(error)
    }
})

router.delete("/", async (req, res, next)=> {
    try{
        const { email } = req.body
        const foundUser = await Users.findOne({
            where: {mail: email}
        })
        const deletedUser = foundUser
        await foundUser.destroy({
            truncate: true
          })
        return res.json(deletedUser)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;