import Joi from 'joi'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const getMessages = async (req, res, next) => {
  const schema = Joi.object({
    room_chat_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}
const createMessage = async (req, res, next) => {
  const schema = Joi.object({
    sender_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    room_chat_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    message: Joi.string().required().min(1).trim().strict()
  })
  try {
    await schema.validateAsync(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
}
export const messageValidation = {
  getMessages,
  createMessage
}