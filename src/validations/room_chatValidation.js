import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const getRoomChat = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}
const createRoomChat = async (req, res, next) => {
  const schema = Joi.object({
    room_name: Joi.string().required().min(3).max(255).trim().strict(),
    members: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).required().min(2),
    avatarRoom: Joi.string().trim().strict(),
    type: Joi.string().valid('group', 'private'),
    note: Joi.string().max(100)
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}
const getListRoomChat = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}
const removeRoomChat = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })

  try {
    await schema.validateAsync(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
}
const comfimInvite = async (req, res, next) => {
  const schemaParam = Joi.object({
    id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  const schemaBody = Joi.object({
    user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    message: Joi.string().valid('accept', 'reject').required()
  })
  try {
    await schemaParam.validateAsync(req.params)
    await schemaBody.validateAsync(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
}
export const room_chatValidation = {
  getRoomChat,
  createRoomChat,
  getListRoomChat,
  removeRoomChat,
  comfimInvite
}