const { Router } = require("express");
const router = Router();
const {
  conn,
  Users,
  Schemas,
  Subscriptions,
  Plans,
} = require("../libs/sequelize");
const sequelize = conn;

const createTemplate = require("../services/schemaTemplate");

const UsersService = require("../services/usersService");
const SubscriptionService = require("../services/subscriptionService");
////////////////////////////////////
let userService = new UsersService();
let subscriptionService = new SubscriptionService();

/////////DESTROY SUBSCRIPTION
router.get("/destroy", async (req, res, next) => {
  const { subscription_id } = req.body;
  try {
    let deleted = await subscriptionService.deleteByIdDB(subscription_id);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
});

///////// SEARCH SUBSCRIPTION
router.get("/all", async (req, res, next) => {
  try {
    let allSubs = await subscriptionService.findAllDB();
    res.json(allSubs);
  } catch (error) {
    next(error);
  }
});
router.get("/createuser", async (req, res, next) => {
  try {
    let user = await userService.createUser();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/deleteSchema", async (req, res, next) => {
  try {
    const { schemaName } = req.body;
    await sequelize.dropSchema(schemaName);
    let schema = await Schemas.findOne({ where: { name: schemaName } });
    await schema.destroy();
    res.send("Schema deleted succesfully");
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
    let createdSubscription = await Subscriptions.findOrCreate({
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
    console.log("Sub ID:  ", subscription_id);
    // creo la asociacion de la suscripcion con el plan
    await plan.setSubscriptions(subscription_id);

    //buscamos el user

    let user = await userService.findOneUser(mail);
    // creo la asociacion de la suscripcion con el plan
    console.log("User: ", user);
    await user.setSubscriptions(subscription_id);

    const schemaName = user.name.replace(/\s/g, "").toLowerCase();
    await sequelize
      .createSchema(schemaName, {
        logging: false,
        dialect: "postgres",
      })
      .then(async () => {
        try {
          await createTemplate(schemaName);
          const sql = `
                INSERT INTO ${schemaName}.Users (name, mail, userType)
                VALUES ('${user.name}', '${user.mail}', 'superadmin')
        `;
          await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
          });
          const schema = await Schemas.create({ name: schemaName });
          // await UsersSchemas.create({ userId: user.id, schemaId: schema.id });
          await user.addSchemas(schema.id);

          await createdSubscription[0].update({
            schema_id: schema.id,
          });
        } catch (error) {
          next(error);
        }
      });

    //retono el plan
    res.status(200).json({message: 'Ok'});
  } catch (error) {
    next(error);
  }
 
});

module.exports = router;

