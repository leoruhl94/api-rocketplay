require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3002,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  // en el archivo .env hay q usar comillas dobles y no backticks 
  // DATABASE_URL="postgres://postgres:38644082@localhost:5432/RocketPlay";
  dbUrl:process.env.DATABASE_URL,
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
    
  ]
};

module.exports = config;
