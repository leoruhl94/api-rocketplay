const loginUser = require('../database/controllers/loginUser');
import Router from "express";
const router = Router();
router.post('/', loginUser)

module.exports = router;

