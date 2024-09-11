import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const createPost = async (req, res, next) => {
  const schema = Joi.object({
    author_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    title: Joi.string().required().min(3).max(100).default(''),
    content: Joi.string(),
    hastag: Joi.string(),
    media: Joi.array().items(Joi.string()),
    status: Joi.string().valid('private', 'published')
  })
  try {

    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}
const updatePost = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string(),
    media: Joi.array().items(Joi.string()),
    status: Joi.string().valid('private', 'published')
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}
export const postValidation = {
  createPost,
  updatePost
}