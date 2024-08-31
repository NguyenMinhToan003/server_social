import { GET_DB } from '~/config/mongodb'
import { userModel } from '~/models/userModel'
import bcrypt from 'bcrypt'
const USER_COLLECTION_NAME = 'users'
const comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash)
}
const login = async (account, password) => {
  try {
    let user = null
    user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      $or: [{ email: account }, { username: account }]
    })
    if (!user) {
      return null
    }
    if (comparePassword(password, user.password)) {
      Object.keys(user).forEach(item => {
        if (userModel.IGNORGEFIELD_USER_SUBMIT.includes(item)) {
          delete user[item]
        }
      })
      return user
    }
    return null
  }
  catch (error) {
    throw error
  }
}
const register = async (data) => {
  try {
    const validData = await userModel.validateDataUser(data)
    let exitsUser
    exitsUser = await userModel.existsAccountByEmail(validData.email)
    if (exitsUser) return { error: 'email already exists' }
    exitsUser = await userModel.existsAccountByUsername(validData.username)
    if (exitsUser) return { error: 'username already exists' }
    const result = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
    return result
  } catch (error) {
    throw error
  }
}
export const authModel = {
  login,
  register
}