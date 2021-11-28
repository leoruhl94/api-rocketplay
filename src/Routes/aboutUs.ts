import Router from "express";
const aboutUs = require("../controllers/aboutUs");
const router = Router();
router.use("/", aboutUs);

module.exports = router;
