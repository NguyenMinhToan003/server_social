import { notificationService } from '~/services/notificationService.js'
import { StatusCodes } from 'http-status-codes'
const inviteGroupChat = async (req, res, next) => {
  try {
    const { sender_user_id, receiver_user_id, action, content, type } = req.body
    const result = await notificationService.inviteGroupChat(
      sender_user_id,
      receiver_user_id,
      action, content,
      type)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    next(error)
  }
}
const getNotification = async (req, res, next) => {
  try {
    const { user_id } = req.params
    const result = await notificationService.getNotification(user_id)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    next(error)
  }
}
const rectifyInviteGroupChat = async (req, res, next) => {
  try {
    const { _id, receiver_user_id, status } = req.body
    const result = await notificationService.rectifyInviteGroupChat(_id, receiver_user_id, status)
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    next(error)
  }
}
export const notificationController = {
  inviteGroupChat,
  getNotification,
  rectifyInviteGroupChat
}