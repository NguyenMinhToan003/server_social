import Joi from 'joi'
import {
  OBJECT_ID_MESSAGE,
  OBJECT_ID_REGEX
} from '~/utils/validation'

const getUser = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE).required()
  })
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}
const updateUser = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().email().required().min(3).max(255).trim().strict(),
    password: Joi.string().required().min(8).max(50).trim().strict(),
    profile_picture: Joi.string(),
    bio: Joi.string().max(100),
    friends: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)),
    posts: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)),
    room_chats: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE))
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}
const addFriend = async (req, res, next) => {
  const schemaParam = Joi.object({
    id: Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE).required()
  })
  const schemaBody = Joi.object({
    friend_id: Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE).required()
  })
  try {
    await schemaParam.validateAsync(req.params)
    await schemaBody.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}
const searchUser = async (req, res, next) => {
  const schema = Joi.object({
    ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).required()
  })
  try {
    await schema.validateAsync(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
}
const searchUserByListId = async (req, res, next) => {
  const schema = Joi.object({
    ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).required()
  })
  try {
    await schema.validateAsync(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
}
export const userValidation = {
  getUser,
  updateUser,
  addFriend,
  searchUser,
  searchUserByListId
}