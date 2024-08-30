import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_MESSAGE, OBJECT_ID_REGEX } from '~/utils/validation'

const login = async (req, res, next) => {
  const schema = Joi.object({
    account: Joi.string().required().min(3).max(255).trim().strict(),
    password: Joi.string().required().min(8).max(50).trim().strict()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().email().required().min(3).max(255).trim().strict(),
    password: Joi.string().required().min(8).max(50).trim().strict(),
    profile_picture: Joi.string().uri(),
    bio: Joi.string().max(100),
    friends: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)),
    posts: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE))
  })
  try {
    // abortEarly: false de hien thi tat ca loi
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const resuil = new ApiError(StatusCodes.BAD_REQUEST, error)
    // console.log(error)
    // res.status(StatusCodes.BAD_REQUEST).json(error)
    next(resuil)
  }
}

export const authValidation = {
  login,
  register
}