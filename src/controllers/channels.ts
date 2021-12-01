import { Response, Request, Router, NextFunction } from 'express';
const router = Router();
const {conn, Users} = require('../libs/sequelize');
const sequelize = conn

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { schemaName, name, isprivate, description } = req.body;
    try {
        const sql = `INSERT INTO ${schemaName.toLowerCase()}.Channels (name, isprivate, description)
                    VALUES ('${name}', '${isprivate}', '${description}')`
            await sequelize.query(sql, {
                type: sequelize.QueryTypes.INSERT
            })    
        res.status(200).send('Channel created succesfully')
    } catch (error) {
        res.status(400).json({message:error})
    }
});


router.get('/', async (req:Request, res:Response, next:NextFunction) => {
    const {schemaName} = req.body;
    try {
        const sql = `SELECT * FROM ${schemaName.toLowerCase()}.channels`
            const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
            })
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json({message:error})
    }
})






module.exports = router;