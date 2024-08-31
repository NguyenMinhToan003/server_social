import { room_chatModel } from '~/models/room_chatModel'
const getRoomChat = async (id) => {
  try {
    const room_chat = await room_chatModel.getRoomChatById(id)
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
export const room_chatSevice = {
  getRoomChat,
  createRoomChat
}