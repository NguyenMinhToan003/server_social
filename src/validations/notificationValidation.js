import Joi from 'joi'
import { OBJECT_ID_MESSAGE, OBJECT_ID_REGEX } from '~/utils/validation'
const inviteGroupChat = async (req, res, next) => {
  const schema = Joi.object({
    sender_user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    receiver_user_id: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).required().min(1),
    action: Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE).required(),
    content: Joi.string().required().min(1),
    type: Joi.string().valid('invite').required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}
const getNotification = async (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)
  })
  try {
    await schema.validateAsync(req.params, { abortEarly: false })
    next()
  }
  catch (error) {
    next(error)
  }
}
const rectifyInviteGroupChat = async (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
    receiver_user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),// validate user_id
    status: Joi.string().valid('accept', 'decline').required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    next(error)
  }
}

export const notificationValidation = {
  inviteGroupChat,
  getNotification,
  rectifyInviteGroupChat
}