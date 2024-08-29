import Joi from 'joi'
import {
  OBJECT_ID_MESSAGE,
  OBJECT_ID_REGEX,
  EMAIL_REGEX,
  EMAIL_MESSAGE
} from '~/utils/validation'
const getUser = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE).required()
  })
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (error) {
    throw error
  }
}
const createUser = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().email().required().min(3).max(50).trim().strict().pattern(EMAIL_REGEX).message(EMAIL_MESSAGE),
    password: Joi.string().required().min(8).max(50).trim().strict(),
    profile_picture: Joi.string().default(''),
    friends: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
    posts: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([])
  })
  try {
    // abortEarly: false de hien thi tat ca loi
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    throw error
  }
}

export const userValidation = {
  getUser,
  createUser
}