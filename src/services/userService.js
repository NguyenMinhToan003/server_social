/* eslint-disable no-useless-catch */
import { userModel } from '~/models/userModel'
const getUser = async (id) => {
  try {
    const user = await userModel.getUserById(id)
    return user
  } catch (error) {
    throw error
  }
}
const createUser = async (userData) => {
  try {
    const data = {
      ...userData
    }
    const result = await userModel.createUser(data)
    return result
  }
  catch (error) { throw error }
}
export const userService = {
  getUser,
  createUser
}
