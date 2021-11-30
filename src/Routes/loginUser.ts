import Router from "express";
const {loginUser} = require('../controllers/loginUser');
const router = Router();
router.use('/', loginUser)


module.exports = router;

