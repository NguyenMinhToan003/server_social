import express from 'express'
import { userController } from '~/controllers/UserController'
import { userValidation } from '~/validations/UserValidation'
const Router = express.Router()

Router.route('/')
  .post(userValidation.createUser, userController.createUser)
Router.route('/:id')
  .get(userValidation.getUser, userController.getUser)
export const userRoute = Router