require("dotenv").config();
const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl:process.env.DATABASE_URL || `postgres://${this.dbUser}:${this.dbPassword}@${this.dbHost}/${this.dbName}`,
  cors: process.env.CORS || 'localhost:3002',
};
module.exports = config
 