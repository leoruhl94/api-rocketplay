const registerBusiness = require('./controllers/registerBusiness.ts')
const router = require("express").Router();
router.post('/', registerBusiness)

module.exports = router;