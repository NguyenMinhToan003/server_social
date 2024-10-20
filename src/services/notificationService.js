import { notificationModel } from '~/models/notificationModel.js'
import { room_chatModel } from '~/models/room_chatModel'
const inviteGroupChat = async (sender_user_id, receiver_user_id, action, content, type) => {
  try {
    const notification = {
      sender_user_id,
      receiver_user_id,
      action,
      content,
      type
    }
    const result = await notificationModel.createNotification(notification)
    const confimInvite = await room_chatModel.comfimInvite(sender_user_id, receiver_user_id, action)
    return result
  } catch (error) {
    throw error
  }
}
const getNotification = async (user_id) => {
  try {
    return await notificationModel.getNotification(user_id)
  } catch (error) {
    throw error
  }
}
const rectifyInviteGroupChat = async (id, receiver_id, status) => {
  try {
    return await notificationModel.updateNotificationJoinGroupChat(id, receiver_id, status)
  }
  catch (error) {
    throw error
  }
}
export const notificationService = {
  inviteGroupChat,
  getNotification,
  rectifyInviteGroupChat
}