const axios = require("axios").default;
const { Subscriptions } = require("../libs/sequelize");
const config = require("../config/config");


class SubscriptionService {
  constructor() {
    this.subscriptions = [];
  }

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
      return response.data;
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }
  async findAllMP(subscriptionId) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/preapproval/search?access_token=${config.tokenMP}`,
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

  async findSubcription(name) {
    let subscriptions = await Subscriptions.findOne({
      where: {
        name,
      },
    });
    return subscriptions;
  }
  async findAllSubcription() {
    let subscriptions = await Subscriptions.findAll();
    return subscriptions;
  }
}

module.exports = SubscriptionService;
