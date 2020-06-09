import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import matchController from '../controllers/match.controller'

const router = new Router()

router
	.route('/')
	.get(expressAsyncHandler(matchController.getAllMatches))
	.post(expressAsyncHandler(matchController.newMatch))
router.route('/:id').get(expressAsyncHandler(matchController.getMatch))

export default router
