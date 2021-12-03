const preferences = {
  planBasic: {
    back_url: "https://rocketplay.com.ar/testingMp",
    reason: "planBasic",
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
    back_url: "https://rocketplay.com.ar/testingMp",
    reason: "planStandard",
    auto_recurring: {
      currency_id: "ARS",
      frequency: "1",
      frequency_type: "months",
      transaction_amount: 10000,
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
    back_url: "https://rocketplay.com.ar/testingMp",
    reason: "planPremium",
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
};

module.exports = preferences;

// preapprovalPlanId: "BASIC_RP_01",
