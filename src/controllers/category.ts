import { Response, Request, NextFunction } from "express";
const { conn } = require("../libs/sequelize");
const sequelize = conn;
const category = {
    addCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { schemaName, name } = req.body;
          const sql = `
                  INSERT INTO ${schemaName.toLowerCase()}.categories(name) VALUES('${name}');
                  `;
          await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
          });
          res.status(200).send("Category created succesfully");
        } catch (error) {
          res.status(400).json({ message: error });
        }
      },
    getCategories: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { schemaName } = req.body;
          const sql = `
                  SELECT * FROM ${schemaName.toLowerCase()}.categories
                  `;
          const result = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT,
          });
          res.status(200).json(result);
        } catch (error) {
          res.status(400).json({ message: error });
        }
      }
}
export default category;