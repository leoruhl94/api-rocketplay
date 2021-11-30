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
  dbUrl:process.env.DATABASE_URL || `postgres://${this.dbUser}:${this.dbPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}`,
  // const URI = `postgres://postgres:38644082@localhost:5432/RocketPlay`;
};

module.exports = config;
