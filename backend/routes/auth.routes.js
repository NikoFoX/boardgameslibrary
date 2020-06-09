import Router from 'express'
import authController from '../controllers/auth.controller'
import expressAsyncHandler from 'express-async-handler'

const router = new Router()

router.get('/', expressAsyncHandler(authController.nothing))
router.post('/login', expressAsyncHandler(authController.login))

export default router
