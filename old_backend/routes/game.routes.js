import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { verifyToken } from '../common/utils'
import gameController from '../controllers/game.controller'

const router = new Router()

router
	.route('/')
	.get(verifyToken, expressAsyncHandler(gameController.getAllGames))
	.post(verifyToken, expressAsyncHandler(gameController.newGame))
router
	.route('/:id')
	.get(verifyToken, expressAsyncHandler(gameController.getGame))
	.patch(verifyToken, expressAsyncHandler(gameController.updateGame))

export default router
