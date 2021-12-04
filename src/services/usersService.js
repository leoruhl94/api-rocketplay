const axios = require("axios").default;
const { Users } = require("../libs/sequelize");

class UsersService {
  constructor() {
    this.users = [];
  }

  async createUser() {
    try {
      let user = await Users.create({
        name: "wuene textile",
        mail: "wuenetextil@gmail.com",
        youtubeChannel: null,
        isBusiness: true,
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findAllUsers() {
    try {
      const users = await Users.findAll();

      return users;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findOneUser(email) {
    try {
      const user = await Users.findOne({
        where: { mail: email },
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
}

module.exports = UsersService;
