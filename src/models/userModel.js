import Joi from 'joi'
import {
  OBJECT_ID_MESSAGE,
  OBJECT_ID_REGEX
} from '~/utils/validation'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
const USER_COLLECTION_NAME = 'users'
const SCHEMA_USER = Joi.object({
  username: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().email().required().min(3).max(50).trim().strict(),
  password: Joi.string().required().trim().strict(),
  bio: Joi.string().max(100).default(''),
  profile_picture: Joi.string().default('https://avatars.githubusercontent.com/u/117341351'),
  friends: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  posts: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  room_chats: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
const IGNORGEFIELD_USER_CHANGE = ['createdAt', '_id']
const IGNORGEFIELD_USER_SUBMIT = ['password']
const getUserById = async (id) => {
  try {

    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    if (!user) return null
    Object.keys(user).forEach(item => {
      if (IGNORGEFIELD_USER_SUBMIT.includes(item)) {
        delete user[item]
      }
    })
    return user
  } catch (error) {
    throw error
  }
}
const validateDataUser = async (data) => {
  return await SCHEMA_USER.validateAsync(data)
}
const existsAccountByEmail = async (email) => {
  return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email })
}
const existsAccountByUsername = async (username) => {
  return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ username: username })
}
const updateUserById = async (id, data) => {
  try {
    const findUserByEmail = await existsAccountByEmail(data.email)
    const findUserByUsername = await existsAccountByUsername(data.username)
    if (findUserByEmail && findUserByEmail._id.toString() !== id) {
      return { error: 'email already exists' }
    }
    if (findUserByUsername && findUserByUsername._id.toString() !== id) {
      return { error: 'username already exists' }
    }
    Object.keys(data).forEach(item => {
      if (IGNORGEFIELD_USER_CHANGE.includes(item))
        delete data[item]
    })
    const posts = data.posts.map(post => new ObjectId(post))
    const friends = data.friends.map(friend => new ObjectId(friend))
    data.posts = posts
    data.friends = friends
    const user = await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, { $set: data })
    Object.keys(user).forEach(item => {
      if (IGNORGEFIELD_USER_SUBMIT.includes(item)) {
        delete user[item]
      }
    })
    return user

  } catch (error) {
    throw error
  }
}
const getListUser = async () => {
  // temp
  try {
    let users = await GET_DB().collection(USER_COLLECTION_NAME).find(
      {}
    ).toArray()
    users.forEach(user => {
      Object.keys(user).forEach(item => {
        console.log(user)
        if (IGNORGEFIELD_USER_SUBMIT.includes(item)) {
          delete user[item]
        }
      })
    })
    return users

  } catch (error) {
    throw error
  }
}
const searchUser = async (q) => {
  try {
    console.log(q)
    const listUserMatch = await GET_DB().collection(USER_COLLECTION_NAME).aggregate(
      [
        {
          $match: {
            $or: [
              { username: { $regex: q, $options: 'i' } },
              { email: { $regex: q, $options: 'i' } }
            ]
          }
        },
        {
          $project: {
            'password': 0,
            'posts': 0,
            'room_chats': 0,
            'createdAt': 0,
            'updatedAt': 0
          }
        }
      ]
    ).toArray()
    return listUserMatch

  }
  catch (error) {
    throw error
  }
}
const getFriends = async (id) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    const friends = await GET_DB().collection(USER_COLLECTION_NAME).find(
      {
        _id: { $in: user.friends }
      },
      {
        projection: {
          password: 0,
          createdAt: 0,
          updatedAt: 0,
          friends: 0,
          posts: 0,
          room_chats: 0,
          bio: 0
        }
      }).toArray()
    return friends
  } catch (error) {
    throw error
  }
}
const addFriend = async (id, friend_id) => {
  try {
    const user1 = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    const user2 = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(friend_id) })
    // khong co user , da co , trung nhau
    const user1FriendString = user1.friends.map(friend => friend.toString())
    const user2FriendString = user2.friends.map(friend => friend.toString())

    if (!user1 || !user2
      || user1FriendString.includes(user2._id.toString())
      || user2FriendString.includes(user1._id.toString())
      || id === friend_id) {
      return null
    }
    await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: user1._id }, { $push: { friends: user2._id } })
    await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: user2._id }, { $push: { friends: user1._id } })
    return true
  }
  catch (error) {
    throw error
  }
}
export const userModel = {
  IGNORGEFIELD_USER_CHANGE,
  IGNORGEFIELD_USER_SUBMIT,
  SCHEMA_USER,
  USER_COLLECTION_NAME,
  existsAccountByEmail,
  existsAccountByUsername,
  getUserById,
  validateDataUser,
  getListUser,
  getFriends,
  addFriend,
  searchUser
}