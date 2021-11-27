import Router from "express";
const uploadVideo = require('../controllers/uploadVideo');
const router = Router();
router.use('/', uploadVideo)

module.exports = router;