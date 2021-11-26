import Router from "express";
const loginBusiness = require('../database/controllers/loginBusiness');
const router = Router();
router.post('/', loginBusiness );
module.exports = router;