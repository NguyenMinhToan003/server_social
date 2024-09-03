import express from 'express'
import { commentValidation } from '~/validations/commentValidation'
import { commentController } from '~/controllers/commentController'
const Router = express.Router()
Router.route('/')
  .post(commentValidation.createComment, commentController.createComment)
Router.route('/:post_id')
  .get(commentValidation.getCommentsByPostId, commentController.getCommentsByPostId)

export const commentRoute = Router