import { messageModel } from '~/models/messageModel'
import { room_chatModel } from '~/models/room_chatModel'
const getMessages = async (roomChatId, userId) => {
  try {
    const messages = await messageModel.getMessages(roomChatId)
    console.log(messages)
    if (messages === null) {
      return { error: 'Error while getting chat' }
    }
    const checkMemberIsOnRoomChat =
      await room_chatModel.checkMemberIsOnRoomChat(roomChatId, userId)
    if (!checkMemberIsOnRoomChat) {
      return { error: 'You are not a member of this chat' }
    }

    return messages
  }
  catch (error) {
    throw error
  }
}
const createMessage = async (messageData) => {
  try {
    const data = {
      ...messageData,
      createdAt: new Date()
    }
    const checkMemberIsOnRoomChat = await room_chatModel.checkMemberIsOnRoomChat(data.room_chat_id, data.sender_id)
    if (!checkMemberIsOnRoomChat) {
      return { error: 'You are not a member of this chat' }
    }
    const result = await messageModel.createMessage(data)
    if (result === null) {
      return { error: 'Error while creating chat' }
    }
    return result
  }
  catch (error) {
    throw error
  }
}
export const messageService = {
  getMessages,
  createMessage
}