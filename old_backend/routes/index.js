import Router from 'express'

import authRouter from './auth.routes'
import matchRouter from './match.routes'
import gameRouter from './game.routes'

const router = new Router()
router.use('/', authRouter)
router.use('/match', matchRouter)
router.use('/game', gameRouter)

export default router
