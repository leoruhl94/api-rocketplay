const axios = require("axios").default;
const { Plans } = require("../libs/sequelize");
const config = require("../config/config");
const preferencesPlans = require("./preferencesPlans");

class PlansService {
  constructor() {
    this.plans = [];
  }

  async generate() {
    try {
      let foundPlans = await Plans.findAll();
      if (!foundPlans.length) {
        let planBasic = await axios.post(
          `https://api.mercadopago.com/preapproval_plan?access_token=${config.tokenMP}`,
          JSON.stringify(preferencesPlans.planBasic),
          {
            headers: {
              Authorization: "Bearer ENV_ACCESS_TOKEN",
              "Content-Type": "application/json",
            },
          }
        );
        let planStandard = await axios.post(
          `https://api.mercadopago.com/preapproval_plan?access_token=${config.tokenMP}`,
          JSON.stringify(preferencesPlans.planStandard),
          {
            headers: {
              Authorization: "Bearer ENV_ACCESS_TOKEN",
              "Content-Type": "application/json",
            },
          }
        );
        let planPremium = await axios.post(
          `https://api.mercadopago.com/preapproval_plan?access_token=${config.tokenMP}`,
          JSON.stringify(preferencesPlans.planPremium),
          {
            headers: {
              Authorization: "Bearer ENV_ACCESS_TOKEN",
              "Content-Type": "application/json",
            },
          }
        );
        planBasic.data.description = [ "Our Basic Plan offers the possibility to add up to 100 subscribers to your workspace. It has an easy-to-use dashboard enabling customization. It has 50GB of storage with no limitations until you meet your quota. Reliable technical support. Video privacy and security. Responsive Video." , "100 subscribers", "50GB storage",
        "Watch videos", "Give likes", "Write comments", "Edit videos", "Upload videos", "Create your workspace", "Edit your workspace", "Responsive Videos", "Video privacy and security", "Reliable technical support"
        ];
        planBasic.data.userLimit = 100;
        planStandard.data.description = [ "Our Standard Plan offers the possibility to add up to 500 subscribers to your workspace. It has an easy-to-use dashboard enabling customization. It has 100GB of storage with no limitations until you meet your quota. Reliable technical support. Video privacy and security. Responsive Video." , "500 subscribers", "100GB storage",
        "Watch videos", "Give likes", "Write comments", "Edit videos", "Upload videos", "Create your workspace", "Edit your workspace", "Responsive Videos", "Video privacy and security", "Reliable technical support during working hours"
        ];
        planStandard.data.userLimit = 500;
        planPremium.data.description = [ "Our Premium Plan offers the possibility to add up to 1000 subscribers to your workspace. It has an easy-to-use dashboard enabling customization. It has 200GB of storage with no limitations until you meet your quota. Reliable technical support. Video privacy and security. Responsive Video." , "1000 subscribers", "200GB storage",
        "Watch videos", "Give likes", "Write comments", "Edit videos", "Upload videos", "Create your workspace", "Edit your workspace", "Responsive Videos", "Video privacy and security", "Reliable technical support 24/7"
        ];
        planPremium.data.userLimit = 1000;

        let plans = [planBasic.data, planStandard.data, planPremium.data];
        for (const plan of plans) {
          await Plans.create({
            id: plan.id,
            name: plan.reason,
            description: plan.description,
            price: plan.auto_recurring.transaction_amount,
            userLimit: plan.userLimit,
            link_checkout: plan.init_point,
            status: plan.status,
            back_url: plan.back_url,
          });
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async generatePlans() {
    try {
      let planBasic = {
        id: "2c9380847d7c2d8f017d8d739a4e0715",
        name: "Plan Basic",
        description:
          "The Basic Plans offers you a limit of 100 users on your platform",
        price: 5000,
        userLimit: 100,
        link_checkout:
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847d7c2d8f017d8d739a4e0715",
        status: "active",
        back_url: "https://www.rocketplay.com.ar/#/preapproval",
        createdAt: "2021-12-06T01:55:04.098Z",
        updatedAt: "2021-12-06T01:55:04.098Z",
      };
      let planStandard = {
        id: "2c9380847d7c2d8f017d8d739d140716",
        name: "Plan Standard",
        description:
          "The Standard Plans offers you a limit of 500 users on your platform",
        price: 15000,
        userLimit: 500,
        link_checkout:
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847d7c2d8f017d8d739d140716",
        status: "active",
        back_url: "https://www.rocketplay.com.ar/#/preapproval",
        createdAt: "2021-12-06T01:55:04.107Z",
        updatedAt: "2021-12-06T01:55:04.107Z",
      };
      let planPremium = {
        id: "2c9380847d7c2d8f017d8d739fab0717",
        name: "Plan Premium",
        description:
          "The Premim Plans offers you a limit of 1000 users on your platform",
        price: 25000,
        userLimit: 1000,
        link_checkout:
          "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380847d7c2d8f017d8d739fab0717",
        status: "active",
        back_url: "https://www.rocketplay.com.ar/#/preapproval",
        createdAt: "2021-12-06T01:55:04.110Z",
        updatedAt: "2021-12-06T01:55:04.110Z",
      };

      let plans = [planBasic, planStandard, planPremium];

      for (const plan of plans) {
        await Plans.findOrCreate({
          where: {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            price: plan.price,
            userLimit: plan.userLimit,
            link_checkout: plan.link_checkout,
            status: plan.status,
            back_url: plan.back_url,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPlan(
    reason,
    transaction_amount,
    back_url,
    description,
    userLimit
  ) {
    try {
      let plan = await axios.post(
        `https://api.mercadopago.com/preapproval_plan?access_token=${config.tokenMP}`,
        JSON.stringify({
          back_url,
          reason,
          auto_recurring: {
            currency_id: "ARS",
            frequency: "1",
            frequency_type: "months",
            transaction_amount,
            billing_day: 10,
            external_reference: "",
            billing_day_proportional: true,
            free_trial: "",
          },
        }),
        {
          headers: {
            Authorization: "Bearer ENV_ACCESS_TOKEN",
            "Content-Type": "application/json",
          },
        }
      );
      await Plans.create({
        name: plan.reason,
        description: description,
        price: plan.auto_recurring.transaction_amount,
        userLimit: userLimit,
        link_checkout: plan.init_point,
        id: plan.id,
        status: plan.status,
        back_url: plan.back_url,
      });
    } catch (error) {
      throw new Error(error.message || "se rompio todo");
    }
  }

  async findPlan(name) {
    let plan = await Plans.findOne({
      where: {
        name,
      },
    });
    return plan;
  }
  async findAllPlans() {
    let plan = await Plans.findAll();
    return plan;
  }
}

module.exports = PlansService;
