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
const updateUser = async (id, data) => {
  try {
    const dataUpdate = {
      ...data,
      updatedAt: Date.now()
    }
    const user = await userModel.updateUserById(id, dataUpdate)

    return user
  } catch (error) {
    throw error
  }
}
const getListUser = async () => {
  try {
    const users = await userModel.getListUser()
    return users
  } catch (error) {
    throw error
  }
}
const getFriends = async (id) => {
  try {
    const friends = await userModel.getFriends(id)
    return friends
  } catch (error) {
    throw error
  }
}
export const userService = {
  getUser,
  updateUser,
  getListUser,
  getFriends
}
