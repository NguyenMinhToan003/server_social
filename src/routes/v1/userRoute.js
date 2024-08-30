import express from 'express'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'
const Router = express.Router()

Router.route('/')
Router.route('/:id')
  .get(userValidation.getUser, userController.getUser)
  .put(userValidation.updateUser, userController.updateUser)
export const userRoute = Router