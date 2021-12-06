const preferences = {
  planBasic: {
    back_url: "https://www.rocketplay.com.ar/#/preapproval",
    reason: "Plan Basic",
    auto_recurring: {
      currency_id: "ARS",
      frequency: "1",
      frequency_type: "months",
      transaction_amount: 5000,
      billing_day: 10,
      external_reference: "",
      billing_day_proportional: true,
      free_trial: {
        frequency_type: "months",
        frequency: "1",
      },
    },
  },
  planStandard: {
    back_url: "https://www.rocketplay.com.ar/#/preapproval",
    reason: "Plan Standard",
    auto_recurring: {
      currency_id: "ARS",
      frequency: "1",
      frequency_type: "months",
      transaction_amount: 15000,
      billing_day: 10,
      external_reference: "",
      billing_day_proportional: true,
      free_trial: {
        frequency_type: "months",
        frequency: "1",
      },
    },
  },
  planPremium: {
    back_url: "https://www.rocketplay.com.ar/#/preapproval",
    reason: "Plan Premium",
    auto_recurring: {
      currency_id: "ARS",
      frequency: "1",
      frequency_type: "months",
      transaction_amount: 25000,
      billing_day: 10,
      external_reference: "",
      billing_day_proportional: true,
      free_trial: {
        frequency_type: "months",
        frequency: "1",
      },
    },
  },
};

module.exports = preferences;

// preapprovalPlanId: "BASIC_RP_01",
