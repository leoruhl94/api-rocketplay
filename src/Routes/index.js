const Router = require("express");
const router = Router();
const loginURouter = require("../controllers/loginUser");
const usersRouter = require("../controllers/users");
const aboutUsRouter = require("../controllers/aboutUs");
const channels = require("../controllers/channels");
const tags = require("../controllers/tags");
const payment = require("../controllers/payment");
const category = require("../controllers/category");
const uploadVideo = require("../controllers/uploadVideo");
const registerBRouter = require("../controllers/registerBusiness");
const registerURouter = require("../controllers/registerUser");
const createSchemaRouter = require("../controllers/createSchema")


const testMP = require("./testMp")
router.use("/testMp", testMP)


router.use("/createSchema", createSchemaRouter)
router.use("/loginUser", loginURouter);
router.use("/users", usersRouter);
router.use("/aboutUs", aboutUsRouter);
router.use("/channels", channels);
router.use("/tags", tags);
router.use("/payment", payment);
router.use("/category", category);
router.use("/uploadVideo", uploadVideo);
router.use("/registerBusiness", registerBRouter);
router.use("/registerUser", registerURouter);

module.exports = router;
