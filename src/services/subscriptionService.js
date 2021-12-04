const axios = require("axios").default;
const { Subscriptions, Users, Plans } = require("../libs/sequelize");
const config = require("../config/config");

class SubscriptionService {

  async findOneMP(subscriptionId) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/preapproval/search?id=${subscriptionId}&access_token=${config.tokenMP}`,
        {
          headers: {
            Authorization: "Bearer ENV_ACCESS_TOKEN",
          },
        }
      );
      return response.data.results[0];
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findAllMP(limit = 10) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/preapproval/search?limit=${limit}&access_token=${config.tokenMP}`,
        {
          headers: {
            Authorization: "Bearer ENV_ACCESS_TOKEN",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }

  async findOneDB(id) {
    try {
      let subscriptions = await Subscriptions.findOne({
        where: {
          id,
        },
      });
      return subscriptions;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findAllDB() {
    try {
      // let subscriptions = await Subscriptions.findAll({include: ["schema", Plans]});
      let subscriptions = await Users.findAll({include: ["schemas", "subscriptions"]});
      return subscriptions;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async deleteByIdDB(id) {
    try {
      let subscriptions = await Subscriptions.destroy({
        where: {
          id,
        },
      });
      return "deleted";
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
}

module.exports = SubscriptionService;
