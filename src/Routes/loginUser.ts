import Router from "express";
const loginUser = require('../controllers/loginUser');
const router = Router();
router.post('/', loginUser)

module.exports = router;

