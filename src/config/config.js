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
};

module.exports = config;
