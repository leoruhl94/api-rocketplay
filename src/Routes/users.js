const Router = require("express");
const { conn, Users } = require("../libs/sequelize");
const router = Router();
const UsersService = require("../services/usersService");
const MailService = require("../services/mailService");
/////////////////////////////////////////////
let mailService = new MailService();
let usersService = new UsersService();

router.get("/all", async (req, res, next) => {
  try {
    res.json(await usersService.findAllUsers());
  } catch (error) {
    next(error);
  }
});
router.get("/deleteall", async (req, res, next) => {
  try {
    res.json(await usersService.deleteAllUsers());
  } catch (error) {
    next(error);
  }
});

router.get("/exist", async (req, res, next) => {
  try {
    const { email } = req.query;
    const userBool = await usersService.findOneUser(email);
    // Si ya estaba creado mando true
    return res.status(200).json({ isRegistered: !!userBool });
  } catch (error) {
    res.send(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;
    return res.status(200).json(await usersService.findOneUser(email));
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, isBusiness, youtubeChannel } = req.body;
    const newUser = await usersService.findOrCreateUser({
      name: name,
      mail: email,
      youtubeChannel: youtubeChannel || null,
      isBusiness: isBusiness || false,
    });
    console.log(newUser[1])
    //mandar mail de welcome
    if(newUser[1]){
      try {
        let subject = 'Welcome to RocketPlay'
        let text = `Hello ${name}! Welcome to RocketPlay, we hope you enjoy the experience with us.
        Best regards,
        The Rocket Play Team`
        let info = await mailService.sendEmail(email, subject, text)
       
        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json(newUser[0]);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { isBusiness, email } = req.body;
    const foundUser = await Users.findOne({
      where: { mail: email },
    });
    await foundUser.update({ isBusiness: isBusiness });
    res.status(200).json({ isBusiness });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await Users.findOne({
      where: { mail: email },
    });
    const deletedUser = foundUser;
    await foundUser.destroy({
      truncate: true,
    });
    return res.json(deletedUser);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
 