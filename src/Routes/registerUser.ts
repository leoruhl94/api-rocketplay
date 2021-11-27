import Router from "express";
const registerUser = require('../controllers/registerUser');
const router = Router();
router.post('/', registerUser)

module.exports = router;
