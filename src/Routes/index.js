const Router = require("express");
const router = Router();
const loginURouter = require("../controllers/loginUser");
const aboutUsRouter = require("../controllers/aboutUs");
const channels = require("../controllers/channels");
const tags = require("../controllers/tags");
const subscriptions = require("../controllers/subscription");
const category = require("../controllers/category");
const uploadVideo = require("../controllers/uploadVideo");
const registerBRouter = require("../controllers/registerBusiness");
const registerURouter = require("../controllers/registerUser");
const createSchemaRouter = require("../controllers/createSchema")
const plans = require("./plans")
const usersRouter = require("./users.js")

router.use("/v2/users", usersRouter)
router.use("/plans", plans)
router.use("/createSchema", createSchemaRouter)
router.use("/loginUser", loginURouter);
router.use("/aboutUs", aboutUsRouter);
router.use("/channels", channels);
router.use("/tags", tags);
router.use("/subscriptions", subscriptions);
router.use("/category", category);
router.use("/uploadVideo", uploadVideo);
router.use("/registerBusiness", registerBRouter);
router.use("/registerUser", registerURouter);

module.exports = router;
