const channels = require('../controllers/channels');
import Router from "express";
const router = Router();
router.use('/', channels)

module.exports = router;