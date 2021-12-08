const Router = require("express");
const { conn, Users } = require("../libs/sequelize");
const router = Router();
const nodemailer = require("nodemailer");
const UsersService = require("../services/usersService");
const { userName, userPass } = require("../config/config");
/////////////////////////////////////////////
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
    // console.log(newUser)
    //mandar mail de welcome
    try {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: userName,
          pass: userPass,
        },
      });
      console.log("email====>>",  email )
      let info = await transporter.sendMail({
        from: '"Rocket Play" <rocketplay2022@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
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
 