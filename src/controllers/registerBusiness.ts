import createTemplate from "../services/schemaTemplate";
import { Response, Request, Router, NextFunction } from 'express';
const router = Router();
const { conn, Users, Plans, Schemas, UsersSchemas } = require('../libs/sequelize');
const sequelize = conn;
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, mail, youtubeChannel } = req.body;
    try {
        await sequelize.createSchema(name, {
            logging: false,
            dialect: 'postgres'
        }).then(async () => {
            const User = await createTemplate(name)
            // await User.findOrCreate({where: { name, password, mail, userType:"superadmin" }})
            const sql = `
                    INSERT INTO ${name.toLowerCase()}.Users (name, password, mail, userType)
                    VALUES ('${name}', '${password}', '${mail}', 'superadmin')
            `
            await sequelize.query(sql, {
                type: sequelize.QueryTypes.INSERT
            })
            await Schemas.create({ name });
            await Users.create({ name, password, mail, youtubeChannel })
                .then(async (user: any) => {
                    const result = await Schemas.findOne({
                        where: {
                            name: name
                        }
                    })
                    if (result) {
                        await UsersSchemas.create({ userId: user.id, schemaId: result.id });
                    }
                })

        })
        res.send('ok')
    } catch (error) {
        next(error)
    }
})
module.exports = router;