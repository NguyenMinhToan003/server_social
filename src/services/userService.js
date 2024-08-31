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
export const userService = {
  getUser,
  updateUser
}
