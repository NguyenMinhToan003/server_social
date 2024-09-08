import { room_chatModel } from '~/models/room_chatModel'
import { messageService } from '~/services/messageService'
const getRoomChat = async (id, userId) => {
  try {

    const room_chat = await room_chatModel.getRoomChatById(id)
    if (room_chat === null) {
      return null
    }
    const messages = await messageService.getMessages(id, userId)
    room_chat.messages = messages
    return room_chat
  } catch (error) {
    throw error
  }
}
const createRoomChat = async (data) => {
  try {
    const room_chat = await room_chatModel.createRoomChat(data)
    return room_chat
  } catch (error) {
    throw error
  }
}
const getListRoomChat = async (userId) => {
  try {
    const room_chats = await room_chatModel.getListRoomChat(userId)
    return room_chats
  } catch (error) {
    throw error
  }
}
export const room_chatSevice = {
  getRoomChat,
  createRoomChat,
  getListRoomChat
}