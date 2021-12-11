const axios = require("axios").default;
const { Subscriptions, Users, Plans, Schemas } = require("../libs/sequelize");
const { conn } = require("../libs/sequelize");
const sequelize = conn;
const config = require("../config/config");

class WorkspaceService {
  async findWorkspaceByCode(schemaCode) {
    try {
      let schema = await Schemas.findOne({ where: { code: schemaCode } });
      return schema;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async joinWorkspace(schemaName, userEmail) {
    try {
      //   let schema = await Schemas.findOne({ where: { name: schemaName } });
      let user = await Users.findOne({ where: { mail: userEmail } });
      console.log("dentro del Join ", schemaName, user.mail, user.name);
      const sql = `
    INSERT INTO ${schemaName}.users (name, mail, userType) VALUES('${user.name}', '${user.mail}', 'subscriber')
    `;
      try {
        let succesfully = await sequelize.query(sql, {
          type: sequelize.QueryTypes.INSERT,
        });
        return true;
      } catch (error) {
        return false;
      }
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findWorkspaceByName(schemaName) {
    try {
      let schema = await Schemas.findOne({ where: { name: schemaName } });
      return schema;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async deleteWorkspaceByName(schemaName) {
    try {
      await sequelize.dropSchema(schemaName);
      let schema = await Schemas.findOne({ where: { name: schemaName } });
      await schema.destroy();
      return true;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async destroyAllWorkspaces() {
    try {
      const allSchemas = await sequelize.dropAllSchemas();
      return allSchemas;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async showAllWorkspaces() {
    try {
      const allSchemas = await sequelize.showAllSchemas();
      return allSchemas;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
}

module.exports = WorkspaceService;
