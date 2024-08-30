import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.getUser(id)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    throw error
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const result = await userService.updateUser(id, data)
    if (result.error) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    throw error
  }
}
export const userController = {
  getUser,
  updateUser
}