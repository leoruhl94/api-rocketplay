const { Router } = require("express");
const router = Router();
const {conn, Users, Schemas, Subscription} = require('../libs/sequelize');
const sequelize = conn;

const SubscriptionService = require('../services/subscriptionService')

let subscriptionService = new SubscriptionService();

router.post("/", async (req, res) => {
  // recibo id del pago 
  const {subscription_id, user} = req.body; 
  let userPaymentData = await subscriptionService.findOneMP(subscription_id);
  
  const createSubscription = await Subscription.create({
    subscription_id: userPaymentData.results.id,
    status: userPaymentData.results.status
  })


  // relacion con el plan a traves del plan_id 
  // relacion con el user a traves del user_id 
  // obtener el usuario id y name para crear el schema
  // crear el schema (name)
  // relacion entre user y schema a traves de la tabla intermedia 
  // relacion entre el schema y la subs a traves del schema_id y subs_id


  // const sql = `
  //                   INSERT INTO public.Users (name, password, mail, userType)
  //                   VALUES ('${name}', '${password}', '${email}', 'superadmin')
  //           `
  //           await sequelize.query(sql, {
  //               type: sequelize.QueryTypes.INSERT
  //           })


});
router.get("/:name", async (req, res) => {

});
module.exports = router;
