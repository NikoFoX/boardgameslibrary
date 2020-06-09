import Router from 'express'

import authRouter from './auth.routes'
import matchRouter from './match.routes'

const router = new Router()
router.use('/', authRouter)
router.use('/match', matchRouter)

export default router
