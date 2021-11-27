import Router from "express";
const router = Router();
const loginBRouter = require('./loginBusiness.ts')
const loginURouter = require('./loginUser.ts')
const registerBRouter = require('./registerBusiness.ts')
const registerURouter = require('./registerUser.ts')
const channelsRouter = require('./channels.ts')
const tagsRouter = require('./tags.ts')
const uploadVideo = require('./uploadVideo')
const oauth2callback = require('./oauth2callback');
router.use('/oauth2callback', oauth2callback)
router.use('/loginBusiness', loginBRouter)
router.use('/loginUser', loginURouter)
router.use('/registerBusiness', registerBRouter)
router.use('/registerUser', registerURouter)
router.use('/channels', channelsRouter)
router.use('/tags', tagsRouter)
router.use('/uploadVideo', uploadVideo )
export default router;