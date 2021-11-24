import createTemplate from "../../services/schemaTemplate";

const { Router } = require("express");
const router = Router();
const {modelDefiners} = require('./src/libs/sequelize');

const sequelize = modelDefiners.sequelize

router.post('/', async (req, res, next)=> {
    const { name, password, mail, youtubeChannel } = req.body;
    try {
        await sequelize.createSchema(name, { 
            logging: false,
            dialect: 'postgres'
    
        }).then(() => {
            createTemplate(name)
        })
        res.send('ok')

    } catch (error) {
        next(error)
    }

})
module.exports = router;