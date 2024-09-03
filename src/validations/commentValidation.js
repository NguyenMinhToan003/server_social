import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const getCommentsByPostId = async (req, res, next) => {
  const schema = Joi.object({
    post_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  try {
    await schema.validateAsync(req.params)
    next()
  }
  catch (error) {
    next(error)
  }
}
const createComment = async (req, res, next) => {
  const schema = Joi.object({
    post_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    author_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    content: Joi.string().required().min(3).max(1000).default('')
  })
  try {
    await schema.validateAsync(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
}
export const commentValidation = {
  getCommentsByPostId,
  createComment
}