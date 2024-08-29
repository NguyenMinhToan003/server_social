import Joi from 'joi'
import {
  OBJECT_ID_MESSAGE,
  OBJECT_ID_REGEX,
  EMAIL_REGEX,
  EMAIL_MESSAGE
} from '~/utils/validation'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
const USER_COLLECTION_NAME = 'users'
const SCHEMA_USER = Joi.object({
  username: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().email().required().min(3).max(50).trim().strict().pattern(EMAIL_REGEX).message(EMAIL_MESSAGE),
  password: Joi.string().required().trim().strict(),
  profile_picture: Joi.string().default(''),
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
const validateData = async (data) => {
  return await SCHEMA_USER.validateAsync(data)
}
const createUser = async (data) => {
  try {
    const validData = await validateData(data)
    const result = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
    return result
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
export const userModel = {
  SCHEMA_USER,
  getUserById,
  createUser
}