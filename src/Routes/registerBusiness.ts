import Router from "express";
const registerBusiness = require('../controllers/registerBusiness');
const router = Router();
router.post('/', registerBusiness)

module.exports = router;