import { authModel } from '~/models/authModel'
import bcrypt from 'bcrypt'
const saltRounds = 10

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}


const login = async (account, password) => {
  try {
    const user = await authModel.login(account, password)
    return user
  }
  catch (error) {
    throw error
  }
}

const register = async (userData) => {
  try {
    const data = {
      ...userData,
      password: await hashPassword(userData.password)
    }
    const result = await authModel.register(data)
    return result
  }
  catch (error) { throw error }
}
export const authService = {
  login,
  register
}
