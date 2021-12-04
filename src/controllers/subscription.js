const { Router } = require("express");
const router = Router();
const {
  conn,
  Users,
  Schemas,
  Subscription,
  Plans,
} = require("../libs/sequelize");
const sequelize = conn;

const UsersService = require("../services/usersService");
const SubscriptionService = require("../services/subscriptionService");
////////////////////////////////////
let userService = new UsersService();
let subscriptionService = new SubscriptionService();
router.get("/", async (req, res, next) => {
  // recibo id del pago
  const { subscription_id, mail } = req.body;
  try {
    let subs = subscriptionService.findOneMP(subscription_id);
    // let plan = await Plans.findOne({
    //   where: {
    //     name: "planBasic",
    //   },
    // });

    // await plan.setSubscription(id);

    console.log(subscription_id);
    let user = await userService.findOneUser(mail);
    console.log(user);
    // creo la asociacion de la suscripcion con el plan
    await user.setSubscription(subscription_id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
///////////////////
router.post("/", async (req, res, next) => {
  // recibo id del pago
  const { subscription_id, mail } = req.body;
  try {
    // buscamos en mp la data del pago de la suscripcion
    let userPaymentData = await subscriptionService.findOneMP(subscription_id);

    // crear la suscripcion en nuestra base de datos
    let createdSubscription = await Subscription.findOrCreate({
      where: {
        id: userPaymentData.id,
        status: userPaymentData.status,
      },
    });

    // busco en la lista de planes el plan al que se suscribe
    let plan = await Plans.findOne({
      where: {
        id: userPaymentData.preapproval_plan_id,
      },
    });

    // creo la asociacion de la suscripcion con el plan
    await plan.setSubscription(subscription_id);

    //buscamos el user

    let user = await userService.findOneUser(mail);
    // creo la asociacion de la suscripcion con el plan
    await user.setSubscription(subscription_id);

    //retono el plan
    res.json(plan);
  } catch (error) {
    next(error);
  }

  // relacion con el plan a traves del plan_id
  // relacion con el user a traves del user_id
  // obtener el usuario id y name para crear el schema
  // cambiar isBusiness
  // crear el schema (name)
  // relacion entre user y schema a traves de la tabla intermedia
  // relacion entre el schema y la subs a traves del schema_id y subs_id
  // response ("ok created")

  // const sql = `
  //                   INSERT INTO public.Users (name, password, mail, userType)
  //                   VALUES ('${name}', '${password}', '${email}', 'superadmin')
  //           `
  //           await sequelize.query(sql, {
  //               type: sequelize.QueryTypes.INSERT
  //           })
});
router.get("/:name", async (req, res) => {});
module.exports = router;

// const Router = require('express')
// const router = Router();
// const {conn, Users, Schemas} = require('../libs/sequelize');
// const sequelize = conn;

// router.post("/",  async function(req, res){
//     try {
//         const { name, email } = req.body
//         const schemaName = name.replace(/\s/g, '').toLowerCase()
//         await sequelize.createSchema(schemaName, {
//             logging: false,
//             dialect: 'postgres'
//         }).then(async () => {
//             await createTemplate(schemaName)
//             const sql = `
//                     INSERT INTO ${schemaName}.Users (name, password, mail, userType)
//                     VALUES ('${name}', '${password}', '${email}', 'superadmin')
//             `
//             await sequelize.query(sql, {
//                 type: sequelize.QueryTypes.INSERT
//             })
//             const schema = await Schemas.create({ name });
//             const foundUser = await Users.findOne({
//                 where: {mail: email}
//             })
//             await UsersSchemas.create({ userId: foundUser.id, schemaId: schema.id });

//             // await Users.create({ name, password, mail, youtubeChannel })
//             //     .then(async (user) => {
//             //         const result = await Schemas.findOne({
//             //             where: {
//             //                 name: name
//             //             }
//             //         })
//             //         if (result) {

//             //         }
//             //     })

//         })
//         res.send('Schema created succesfully').status(200)
//     } catch (error) {
//         res.send(error)
//     }

// })
// module.exports = router;
