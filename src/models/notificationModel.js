import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import Joi from 'joi'
import { OBJECT_ID_MESSAGE, OBJECT_ID_REGEX } from '~/utils/validation'
const NOTIFICATION_COLLECTION_NAME = 'notifications'
const IGNOREFIELD_NOTIFICATION_CHANGE = ['createdAt', '_id']
const IGNOREFIELD_NOTIFICATION_SUBMIT = []
const SCHEMA_NOTIFICATION = Joi.object({
  receiver_user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  sender_user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  type: Joi.string().valid('like', 'comment', 'follow', 'invite', 'message').required(),
  content: Joi.string().required().min(1),
  action: Joi.string(),
  status: Joi.string().default('unread'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
