import Router from 'express'
import authController from '../controllers/auth.controller'
import asyncHandler from 'express-async-handler'

const router = new Router()

router.get('/', asyncHandler(authController.nothing))
router.post('/login', asyncHandler(authController.login))

export default router
