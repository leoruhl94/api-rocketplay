const Router = require("express");
const router = Router();
const { conn } = require("../libs/sequelize");
const sequelize = conn;

router.get("/", async (req, res, next) => {

    try {

    } catch(error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {

    try {

    } catch(error) {
        next(error)
    }
})

router.put("/", async (req, res, next) => {

    try {

    } catch(error) {
        next(error)
    }
})

module.exports = router;