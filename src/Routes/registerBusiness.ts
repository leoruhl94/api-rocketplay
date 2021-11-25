const registerBusiness = require('../database/controllers/registerBusiness');
import Router from "express";
const router = Router();
router.post('/', registerBusiness)

module.exports = router;