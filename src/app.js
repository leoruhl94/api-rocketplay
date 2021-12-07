const express = require("express");
const morgan = require("morgan");
const routes = require("./Routes");
const cors = require("cors");
const {
  logErrors,
  errorHandler,
  ormErrorHandler,
} = require("./middlewares/errorHandler");
const server = express();
const PlansService = require("./services/plansService");

let planService = new PlansService();
async function seeders() {
  await planService.generatePlans();
}
seeders();
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan("tiny"));
server.use(
  cors({
    // origin: config.corsWhiteList || !origin,
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authortization",
    ],
  })
);
server.use("/", routes);
server.use(logErrors);
server.use(ormErrorHandler);
server.use(errorHandler);

server.get("/active", (req, res) => {
  return res.json("Hello, we are up and running!");
});
module.exports = server;
