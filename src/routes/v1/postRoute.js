import express from 'express'
import { postController } from '~/controllers/postController'
import { postValidation } from '~/validations/postValidation'
const Router = express.Router()

Router.route('/')
  .get(postController.getPosts)
  .post(postValidation.createPost, postController.createPost)
  .put(postValidation.updatePost, postController.updatePost)

export const postRoute = Router
