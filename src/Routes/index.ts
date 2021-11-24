const { Router } = require("express");
const router = Router();

const loginBRouter = require('./Routes/loginBusiness.ts')
const loginURouter = require('./Routes/loginUser.ts')
const registerBRouter = require('./Routes/registerBusiness.ts')
const registerURouter = require('./Routes/registerUser.ts')

router.use('/loginBusiness', loginBRouter)
router.use('/loginUser', loginURouter)
router.use('/registerBusiness', registerBRouter)
router.use('/registerUser', registerURouter)

module.exports = router;