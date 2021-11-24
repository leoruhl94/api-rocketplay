const loginUser = require('./controllers/loginUser.ts')
const router = require("express").Router();
router.post('/', loginUser)

module.exports = router;

