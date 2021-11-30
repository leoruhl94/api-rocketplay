// import config from "../config/config";
const config = require("../config/config.ts")

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`;

// const URI = `postgres://postgres:38644082@localhost:5432/RocketPlay`;
const URI = config.dbUrl;

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres'
    },
    production: {
        url: URI,
        dialect: 'postgres'
    }
}

// export default {
//     development: {
//         url: URI,
//         dialect: 'postgres'
//     },
//     production: {
//         url: URI,
//         dialect: 'postgres'
//     }
// }