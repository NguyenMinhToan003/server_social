import Joi from 'joi'
import { OBJECT_ID_MESSAGE, OBJECT_ID_REGEX } from '~/utils/validation'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { userModel } from './userModel'
const CHAT_COLLECTION_NAME = 'messages'
const IGNOREFIELD_CHAT_CHANGE = ['createdAt', '_id']
const IGNOREFIELD_CHAT_SUBMIT = []
const SCHEMA_CHAT = Joi.object({
  sender_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  room_chat_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  message: Joi.string().required().min(1).trim().strict(),
  status: Joi.string().default('unread'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
const validationDataChat = async (data) => {
  return await SCHEMA_CHAT.validateAsync(data)
}
const getMessages = async (roomChatId) => {
  try {
    const messages = await GET_DB().collection(CHAT_COLLECTION_NAME).aggregate([
      { $match: { room_chat_id: new ObjectId(roomChatId) } },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'sender_id',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $project: {
          sender: {
            _id: 1,
            username: 1,
            profile_picture: 1
          },
          message: 1,
          status: 1,
          createdAt: 1
        }
      }

    ]).toArray()
    return messages
  } catch (error) {
    throw error
  }
}
const createMessage = async (data) => {
  try {
    data = await validationDataChat(data)
    data.sender_id = new ObjectId(data.sender_id)
    data.room_chat_id = new ObjectId(data.room_chat_id)
    const chat = await GET_DB().collection(CHAT_COLLECTION_NAME).insertOne(data)
    return chat
  } catch (error) {
    throw error
  }
}
export const messageModel = {
  IGNOREFIELD_CHAT_CHANGE,
  IGNOREFIELD_CHAT_SUBMIT,
  CHAT_COLLECTION_NAME,
  createMessage,
  getMessages
}