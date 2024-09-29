import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
import { messageModel } from '~/models/messageModel'
const ROOM_CHAT_COLLECTION_NAME = 'room_chats'
const SCHEMA_ROOM_CHAT = Joi.object({
  room_name: Joi.string().required().min(3).max(255).trim().strict(),
  members: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).required(),
  avatarRoom: Joi.string().trim().strict().default(''),
  // private is both member can chat, group is all member can chat
  type: Joi.string().valid('group', 'private').default('group'),
  note: Joi.string().max(100).default('Wellcome to room chat'),
  isRemove: Joi.boolean().default(false),
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
      {
        $match: { _id: new ObjectId(id) }
      }
    ]).toArray()
    if (room_chat.length === 0) return null
    return room_chat[0]
  }
  catch (error) {
    throw error
  }
}
const checkMemberIsOnRoomChat = async (roomChatId, memberId) => {
  try {
    const room_chat = await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).findOne(
      { _id: new ObjectId(roomChatId) })
    let check = false
    room_chat?.members?.forEach(
      i => { if (i.equals(new ObjectId(memberId))) check = true }
    )
    return check
  }
  catch (error) {
    throw error
  }
}
const createRoomChat = async (data) => {
  try {
    data = await validationDataRoomChat(data)

    data.members = data.members.map(member => new ObjectId(member))
    return await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).insertOne(data)
  }
  catch (error) {
    throw error
  }
}
const findRoomChatPrivateBothMember = async (member1, member2) => {
  try {
    const room_chat = await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).findOne({
      members: { $all: [new ObjectId(member1), new ObjectId(member2)] },
      type: 'private'
    })
    return room_chat
  }
  catch (error) {
    throw error
  }
}
const getListRoomChat = async (userId) => {
  try {
    const room_chats = await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).aggregate([
      {
        $match:
        {
          members: { $all: [new ObjectId(userId)] },
          isRemove: false
        }
      }
    ]).toArray()
    return room_chats
  }
  catch (error) {
    throw error
  }
}
const removeRoomChat = async (id, userId) => {
  try {
    const roomchat = await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    if (roomchat === null && roomchat.type === 'private') return null
    const roleUser = roomchat.members.some(member => member.equals(new ObjectId(userId)))
    if (roleUser) {
      const listMessagesId = await GET_DB().collection(messageModel.CHAT_COLLECTION_NAME).deleteMany({ room_chat_id: new ObjectId(id) })
      return listMessagesId
    }
    return null
  }
  catch (error) {
    throw error
  }
}
const updateRoomChat = async (id, data) => {
  try {
    console.log(data)
    const result = await GET_DB().collection(ROOM_CHAT_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    )
    return result
  }
  catch (error) {
    throw error
  }
}
export const room_chatModel = {
  SCHEMA_ROOM_CHAT,
  updateRoomChat,
  getRoomChatById,
  createRoomChat,
  checkMemberIsOnRoomChat,
  findRoomChatPrivateBothMember,
  getListRoomChat,
  removeRoomChat
}
