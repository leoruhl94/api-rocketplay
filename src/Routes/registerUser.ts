const registerUser = require('./controllers/registerUser.ts')
const router = require("express").Router();
router.post('/', registerUser)

module.exports = router;
