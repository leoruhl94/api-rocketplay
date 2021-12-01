import {Response, Request, Router, NextFunction} from 'express';
const {conn, Users} = require('../libs/sequelize')
const router = Router();
router.get('/', async (req:Request, res:Response, next:NextFunction)=> {
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




    // const {mail, password} = req.body;
    // const user = await Users.findOne({
    //     where:{
    //         mail,
    //         password
    //     }
    // })
    // if(user){
    //     res.status(200).json({isUser:true})
    // }else{
    //     res.status(400).json({isUser:false})
    // }
})


router.post("/", async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const {name, email, isBusiness} = req.body
        const newUser = await Users.create({name:name, mail:email, isBusiness:isBusiness})
        res.status(200).json(newUser)
    } catch (error) {
        res.send(error)
    }
})

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
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




router.delete("/", async (req:Request, res:Response, next:NextFunction)=> {
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