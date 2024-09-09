import { room_chatSevice } from '~/services/room_chatSevice'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
const getRoomChat = async (req, res, next) => {
  try {
    const { id, user_id } = req.params
    let room_chat = await room_chatSevice.getRoomChat(id, user_id)
    if (room_chat === null) {
      room_chat = await room_chatSevice.findAndCreateRoomChatBothMember(id, user_id)
      if (room_chat === null)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Room chat not found' })
      if (room_chat.insertedId)
        room_chat = await room_chatSevice.getRoomChat(room_chat.insertedId, user_id)
    }
    return res.status(StatusCodes.OK).json(room_chat)
  } catch (error) {
    next(error)
  }
}
const createRoomChat = async (req, res, next) => {
  try {
    const room_chat = await room_chatSevice.createRoomChat(req.body)
    return res.status(StatusCodes.CREATED).json(room_chat)
  } catch (error) {
    next(error)
  }
}
const getListRoomChat = async (req, res, next) => {
  try {
    const { id } = req.params
    const room_chats = await room_chatSevice.getListRoomChat(id)
    return res.status(StatusCodes.OK).json(room_chats)
  } catch (error) {
    next(error)
  }
}
export const room_chatController = {
  getRoomChat,
  createRoomChat,
  getListRoomChat
}