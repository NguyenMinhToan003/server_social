import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import Joi from 'joi'
import { OBJECT_ID_MESSAGE, OBJECT_ID_REGEX } from '~/utils/validation'
import { userModel } from './userModel'

const NOTIFICATION_COLLECTION_NAME = 'notifications'
const IGNOREFIELD_NOTIFICATION_CHANGE = ['createdAt', '_id']
const IGNOREFIELD_NOTIFICATION_SUBMIT = []
const SCHEMA_NOTIFICATION = Joi.object({
  // user id of sender -> string ObjectId
  sender_user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  // user ids of receivers -> array
  receiver_user_id: Joi.string().required().trim().strict().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  // type of notification
  type: Joi.string().valid('like', 'comment', 'follow', 'invite', 'message').required(),
  content: Joi.string().required().min(1),
  // action of notification invite-> groupchatId , like-> postId, comment-> postId, follow-> userId, message-> roomId
  action: Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  status: Joi.string().valid('accept', 'decline', 'read', 'unread').default('unread'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
const createNotification = async (notification) => {
  try {
    const notify = await SCHEMA_NOTIFICATION.validateAsync(notification)
    notify.sender_user_id = new ObjectId(notify.sender_user_id)
    notify.receiver_user_id = new ObjectId(notify.receiver_user_id)
    notify.action = new ObjectId(notify.action)
    const result = await GET_DB().collection(NOTIFICATION_COLLECTION_NAME).insertOne(notify)
    return result
  }
  catch (error) {
    throw error
  }
}
const getNotification = async (user_id) => {
  try {
    return await GET_DB().collection(NOTIFICATION_COLLECTION_NAME).aggregate([
      {
        $match: { receiver_user_id: new ObjectId(user_id) }
      },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'sender_user_id',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $project: {
          _id: 1,
          sender: {
            _id: 1,
            username: 1,
            profile_picture: 1,
            email: 1
          },
          receiver_user_ids: 1,
          type: 1,
          content: 1,
          action: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}
const updateNotificationJoinGroupChat = async (id, receiver_id, status) => {
  try {
    const notification = await GET_DB().collection(NOTIFICATION_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })

    if (!notification || notification.receiver_user_id === new ObjectId(receiver_id))
      return null
    const result = await GET_DB().collection(NOTIFICATION_COLLECTION_NAME).updateOne({
      status
    })
    return result
  }
  catch (error) {
    throw error
  }
}
export const notificationModel = {
  SCHEMA_NOTIFICATION,
  NOTIFICATION_COLLECTION_NAME,
  createNotification,
  getNotification,
  updateNotificationJoinGroupChat
}