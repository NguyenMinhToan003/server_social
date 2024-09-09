import { room_chatModel } from '~/models/room_chatModel'
import { userModel } from '~/models/userModel'
import { messageService } from '~/services/messageService'
const getRoomChat = async (id, userId) => {
  try {
    const room_chat = await room_chatModel.getRoomChatById(id)
    if (room_chat === null) {
      return null
    }
    if (room_chat.type === 'private') {
      const member = room_chat.room_name.split(' ')
      const user = await userModel.getUserById(userId)
      room_chat.room_name = member[0] === user.username ? member[1] : member[0]
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
    const user = await userModel.getUserById(userId)
    let room_chats = await room_chatModel.getListRoomChat(userId)
    room_chats = room_chats.map(room => {
      if (room.type === 'private') {
        const member = room.room_name.split(' ')
        room.room_name = member[0] === user.username ? member[1] : member[0]
        return room
      }
      return room
    })
    return room_chats
  } catch (error) {
    throw error
  }
}
const findAndCreateRoomChatBothMember = async (member1, member2) => {
  try {
    const user1 = await userModel.getUserById(member1)
    const user2 = await userModel.getUserById(member2)

    if (user1 === null || user2 === null) return null
    let room_chat = await room_chatModel.findRoomChatPrivateBothMember(member1, member2)
    if (room_chat !== null) return room_chat
    room_chat = await room_chatModel.createRoomChat({
      room_name: `${user1.username} ${user2.username}`,
      members: [member1, member2],
      type: 'private'
    })
    return room_chat
  }
  catch (error) {
    throw error
  }
}
export const room_chatSevice = {
  getRoomChat,
  createRoomChat,
  getListRoomChat,
  findAndCreateRoomChatBothMember
}