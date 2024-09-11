import express from 'express'
import { postController } from '~/controllers/postController'
import { postValidation } from '~/validations/postValidation'
import cloudinary from '~/config/cloudinary'
import multer from 'multer'

import { CloudinaryStorage } from 'multer-storage-cloudinary'
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'BANK',
  allowfomat: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
})
const upload = multer({
  storage: storage
})

const Router = express.Router()

Router.route('/')
  .get(postController.getPosts)
  .post(upload.any('media', 100), postValidation.createPost, postController.createPost)
  .put(postValidation.updatePost, postController.updatePost)

export const postRoute = Router
