const Router = require("express");
const { conn, Users } = require("../libs/sequelize");
const router = Router();
const UsersService = require("../services/usersService");
const MailService = require("../services/mailService");
/////////////////////////////////////////////
let mailService = new MailService();
let usersService = new UsersService();

router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;
    if(email){
      return res.status(200).json(await usersService.findOneUser(email));
    } else{
      res.json(await usersService.findAllUsers());
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    if(email){
      return res.status(200).json(await usersService.deleteUser(email));
    } else{
      res.json(await usersService.deleteAllUsers());
    }
  } catch (error) {
    next(error);
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
    next(error);
  }
});



// router.delete("/", async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const foundUser = await Users.findOne({
//       where: { mail: email },
//     });
//     const deletedUser = foundUser;
//     await foundUser.destroy({
//       truncate: true,
//     });
//     return res.json(deletedUser);
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = router;
 