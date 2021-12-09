const Router = require('express')
const router = Router();
const {conn, Users, Schemas} = require('../libs/sequelize');
const sequelize = conn;
const createTemplate = require("../services/schemaTemplate");



router.post("/",  async function(req, res){
    try {
        const { name, email, password } = req.body
        const schemaName = name.replace(/\s/g, '').toLowerCase()
        await sequelize.createSchema(schemaName, {
            logging: false,
            dialect: 'postgres'
        }).then(async () => {
            await createTemplate(schemaName)
            // const sql = `
            //         INSERT INTO ${schemaName}.Users (name, password, mail, userType)
            //         VALUES ('${name}', '${password}', '${email}', 'superadmin')
            // `
            // await sequelize.query(sql, {
            //     type: sequelize.QueryTypes.INSERT
            // })
            // const schema = await Schemas.create({ name });
            // const foundUser = await Users.findOne({
            //     where: {mail: email}
            // })
            // await UsersSchemas.create({ userId: foundUser.id, schemaId: schema.id });

            // await Users.create({ name, password, mail, youtubeChannel })
            //     .then(async (user) => {
            //         const result = await Schemas.findOne({
            //             where: {
            //                 name: name
            //             }
            //         })
            //         if (result) {
                        
            //         }
            //     })

        })
        res.send('Schema created succesfully').status(200)
    } catch (error) {
        res.send(error)
    }


})
module.exports = router;