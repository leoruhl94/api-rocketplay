import Router from "express";
const loginBusiness = require('../controllers/loginBusiness.ts');
const router = Router();
router.post('/', loginBusiness );
module.exports = router;