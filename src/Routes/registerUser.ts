const registerUser = require('../database/controllers/registerUser');
import Router from "express";
const router = Router();
router.post('/', registerUser)

module.exports = router;
