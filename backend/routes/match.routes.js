import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import matchController from '../controllers/match.controller'
import { verifyToken } from '../common/utils'

const router = new Router()

router
	.route('/')
	.get(verifyToken, expressAsyncHandler(matchController.getAllMatches))
	.post(expressAsyncHandler(matchController.newMatch))
router
	.route('/:id')
	.get(verifyToken, expressAsyncHandler(matchController.getMatch))

export default router
