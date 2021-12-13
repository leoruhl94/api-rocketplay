const axios = require("axios").default;
const nodemailer = require("nodemailer")
const { transporter } = require('../config/config')

class MailService {
  constructor() {
    this.users = [];
  }
  
  async sendEmail(mail, subject, text) {
    try {
      let info = await transporter.sendMail({
              from: '"Rocket Play" <rocketplay2022@gmail.com>', 
              to: mail,
              subject: subject,
              text: text,

            });
            return info
    } catch (error) {
      throw new Error(error.message || "everything is broken");
    }
  }


}

module.exports = MailService;
