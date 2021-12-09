require("dotenv").config();
const mercadopago = require("mercadopago");
const nodemailer = require("nodemailer")

const config = {
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3002,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  // en el archivo .env hay q usar comillas dobles y no backticks 
  // DATABASE_URL="postgres://postgres:38644082@localhost:5432/RocketPlay";
  dbUrl:process.env.DATABASE_URL,
  tokenMP:process.env.TOKEN_MERCADO_PAGO,
  awsAccessKey:process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  bucketName:process.env.S3_BUCKET_NAME,
  corsWhiteList: [
    'https://www.rocketplay.com.ar',
    'http://www.rocketplay.com.ar',
    'http://rocketplay.com.ar',
    'https://rocketplay.com.ar',
    'http://develop.rocketplay.com.ar',
    'https://develop.rocketplay.com.ar',
    'http://www.develop.rocketplay.com.ar',
    'https://www.develop.rocketplay.com.ar',
    'http://localhost:3006',
  ],
  userName: process.env.EMAIL_USERNAME,
  userPass: process.env.EMAIL_PASSWORD,
  transporter: nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
};

mercadopago.configure({
  access_token: config.tokenMP,
});


module.exports = config;
