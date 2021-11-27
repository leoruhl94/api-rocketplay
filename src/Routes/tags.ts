import Router from "express";
const tags = require('../controllers/tags');
const router = Router();
router.use('/', tags)

module.exports = router;
