import Router from "express";
const router = Router();
const loginBRouter = require('./loginBusiness.ts')
const loginURouter = require('./loginUser.ts')
const registerBRouter = require('./registerBusiness.ts')
const registerURouter = require('./registerUser.ts')
router.use('/loginBusiness', loginBRouter)
router.use('/loginUser', loginURouter)
router.use('/registerBusiness', registerBRouter)
router.use('/registerUser', registerURouter)
export default router;