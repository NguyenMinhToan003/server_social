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
  profile_picture: Joi.string().default('https://avatars.githubusercontent.com/u/117341351?'),
  friends: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  posts: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
const getUserById = async (id) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return user
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
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
    const user = await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, { $set: data })
    return user

  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

export const userModel = {
  SCHEMA_USER,
  existsAccountByEmail,
  existsAccountByUsername,
  getUserById,
  validateDataUser,
  updateUserById
}