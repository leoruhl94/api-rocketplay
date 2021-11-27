import Router from "express";
const oauth2callback = require('../controllers/oauth2callback');
const router = Router();
router.use('/', oauth2callback)

module.exports = router;

