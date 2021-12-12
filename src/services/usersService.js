const { Users } = require("../libs/sequelize");

class UsersService {
  constructor() {
    this.users = [];
  }

  async findOrCreateUser({name, mail, youtubeChannel=null, isBusiness=false, workspaces=null}) {
    try {
      let foundUser = await Users.findOne({where:{
        mail,
      }});
      if(!foundUser?.name){
        let user = await Users.create({
          name,
          mail,
          workspaces,
          youtubeChannel,
          isBusiness
        });
        return user;
      }
      return foundUser;
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
        where: {},
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
        include: ["subscriptions"],
      });
      return user;
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }
}

module.exports = UsersService;
