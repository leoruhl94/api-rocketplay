import Router from "express";
const users = require('../controllers/users.ts');
const router = Router();
router.use('/', users );
module.exports = router;