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
      // console.log(foundPlans)
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
        // console.log(planBasic.data)
        planBasic.data.description = `The Basic Plans offers you a limit of 100 users on your platform`;
        planBasic.data.userLimit = 100;
        planStandard.data.description = `The Standard Plans offers you a limit of 500 users on your platform`;
        planStandard.data.userLimit = 500;
        planPremium.data.description = `The Premim Plans offers you a limit of 1000 users on your platform`;
        planPremium.data.userLimit = 1000;

        let plans = [
          planBasic.data,
          planStandard.data,
          planPremium.data,
        ];
        // console.log("=======>>>", plans)
        for (const plan of plans) {
          // console.log("=======>>>",plan)
          await Plans.create({
            
              id: plan.id, // id (mp) 
              name: plan.reason, //reason (mp)
              description: plan.description,
              price: plan.auto_recurring.transaction_amount, //(auto_recurring) transaction_amount
              userLimit: plan.userLimit,
              link_checkout: plan.init_point, //init_point (mp)
              status: plan.status, //status (mp)
              back_url: plan.back_url, //back_url (mp)
            
          });
        }
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
          name: plan.reason, //reason (mp)
          description: description,
          price: plan.auto_recurring.transaction_amount, //(auto_recurring) transaction_amount
          userLimit: userLimit,
          link_checkout: plan.init_point, //init_point (mp)
          id: plan.id, // id (mp)
          status: plan.status, //status (mp)
          back_url: plan.back_url, //back_url (mp)
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
