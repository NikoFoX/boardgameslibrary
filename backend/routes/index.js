import Router from 'express'

import authRouter from './auth.routes'

const router = new Router()
router.use(authRouter)

export default router
