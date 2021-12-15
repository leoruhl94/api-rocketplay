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
const nodemailer = require("nodemailer");
const createTemplate = require("../services/schemaTemplate");

const transporter = require("../config/config");
const UsersService = require("../services/usersService");
const MailService = require("../services/mailService");
const SubscriptionService = require("../services/subscriptionService");

////////////////////////////////////
let userService = new UsersService();
let mailService = new MailService();
let subscriptionService = new SubscriptionService();

/////////DESTROY SUBSCRIPTION
router.get("/destroy", async (req, res, next) => {
  const { subscription_id } = req.query;
  try {
    let deleted = await subscriptionService.deleteByIdDB(subscription_id);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
});

///////// SEARCH SUBSCRIPTION
router.get("/", async (req, res, next) => {
  try {
    let allSubs = await subscriptionService.findAllDB();
    res.json(allSubs);
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
   
    // creo la asociacion de la suscripcion con el plan
    await plan.setSubscriptions(subscription_id);

    let user = await userService.findOneUser(mail);
    // creo la asociacion de la suscripcion con el plan

    await user.setSubscriptions(subscription_id);
    const schemaName = user.name.replace(/\s/g, "").toLowerCase();
    let foundSchema = await Schemas.findOne({ where: { name: schemaName } });

  
    if (foundSchema) {
      await sequelize.dropSchema(foundSchema.name);
      await foundSchema.destroy();
    }

    await sequelize
      .createSchema(schemaName, {
        logging: false,
        dialect: "postgres",
      })
      .then(async () => {
        try {
          await createTemplate(schemaName);
          const sql = `
                INSERT INTO ${schemaName}.members (name, mail, userType)
                VALUES ('${user.name}', '${user.mail}', 'superadmin')
        `;
          await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
          });
          const schema = await Schemas.create({
            name: schemaName,
            status: "authorized",
            code: schemaName,
            title: user.name,
          });
         
          
          await user.addSchemas(schema.id);
          await user.update({ isBusiness: true });
          await createdSubscription[0].update({
            schema_id: schema.id,
          });
          
          let workspaces = user.workspaces || [];
          let workspacesTitles = user.workspacesTitles || [];
          await user.update({ workspaces: [...workspaces, schemaName] });
          await user.update({
            workspacesTitles: [...workspacesTitles, user.name],
          });
        } catch (error) {
          next(error);
        }
      });
    try {
      let subject = "Welcome to the RocketPlay subscription system";
      let text = `Hello ${user.name}! Thank you for subscribing to ${plan.name}.
      We are glad to be working with you.
      Best regards,
      The Rocket Play Team`;
      let info = await mailService.sendEmail(mail, subject, text);

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }
    //confirmo q el proceso se completo correctamente
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    next(error);
  }
});

/////////////////   PUT___

router.put("/", async (req, res, next) => {
  const { email, status, id } = req.body;
  try {
    console.log("PUT ==>> ", email, status);
    let user = await userService.findOneUser(email);
    let subscription = await subscriptionService.findOneDB(
      user.subscriptions[0].id
    );

    let subscriptionUpdated = await subscriptionService.updateSubscriptionMP(
      user.subscriptions[0].id,
      status
    );

    if (subscriptionUpdated.status === status) {
      await subscription.update({ status: status });

      if (subscriptionUpdated.status === "cancelled") {
        // cambiar en tabla schema a cancelled
        await user.update({ isBusiness: false });
      }

      try {
        let subject = "News from the RocketPlay Team";
        let text = `Hello ${user.name}! Your subscription has been correctly updated.
      The new status is ${subscriptionUpdated.status}
      Best regards,
      The Rocket Play Team`;
        let info = await mailService.sendEmail(email, subject, text);

        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log(error);
      }
      res.json({
        message: "Your subscription was updated",
        status: subscriptionUpdated.status,
      });
    } else {
      try {
        let subject = "News from the RocketPlay Team";
        let text = `Hello ${user.name}! Your subscription has not been correctly updated.
      The current status is ${subscriptionUpdated.status}
      Please try again.
      Best regards,
      The Rocket Play Team`;
        let info = await mailService.sendEmail(email, subject, text);

        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log(error);
      }
      res.json({
        message: "Your subscription was not updated",
        status: subscriptionUpdated.status,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
