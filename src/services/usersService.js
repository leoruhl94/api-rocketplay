const axios = require("axios").default;
const { Users } = require("../libs/sequelize");

class UsersService {
  constructor() {
    this.users = [];
  }

  async createUser({name, mail, youtubeChannel=null, isBusiness=false}) {
    try {
      let user = await Users.create({
        name,
        mail,
        youtubeChannel,
        isBusiness
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }

  async deleteUser(mail) {
    try {
      let user = await Users.destroy({
        where: {
          mail: mail,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }
  async deleteAllUsers() {
    try {
      let user = await Users.destroy({
        truncate: true,
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }
  async findAllUsers() {
    try {
      const users = await Users.findAll();
      return users;
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }
  async findOneUser(email) {
    try {
      const user = await Users.findOne({
        where: { mail: email },
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }
}

module.exports = UsersService;
