import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const ROOM_CHAT_COLLECTION_NAME = 'room_chats'
const SCHEMA_ROOM_CHAT = Joi.object({
  room_name: Joi.string().required().min(3).max(255).trim().strict(),
  members: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).required(),
  note: Joi.string().max(100).default('Wellcome to room chat'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
const IGNOREFIELD_ROOM_CHAT_CHANGE = ['createdAt', '_id']
const IGNOREFIELD_ROOM_CHAT_SUBMIT = []
const validationDataRoomChat = async (data) => {
  return await SCHEMA_ROOM_CHAT.validateAsync(data)
}
const getRoomChatById = async (id) => {
  try {
    const room_chat = await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'chats',
          localField: '_id',
          foreignField: 'room_chat_id',
          as: 'chats'
        }
      }
    ]).toArray()
    return room_chat[0]
  }
  catch (error) {
    throw error
  }
}
const createRoomChat = async (data) => {
  try {
    const members = data.members.map(member => new ObjectId(member))
    data = await validationDataRoomChat(data)
    data.members = members
    return await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).insertOne(data)
  }
  catch (error) {
    throw error
  }
}
export const room_chatModel = {
  SCHEMA_ROOM_CHAT,
  getRoomChatById,
  createRoomChat
}
