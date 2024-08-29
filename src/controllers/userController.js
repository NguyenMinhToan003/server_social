import { userService } from '~/services/userService'

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.getUser(id)
    res.status(200).json(user)
  } catch (error) {
    throw error
  }
}
const createUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body)
    res.status(201).json(result)
  } catch (error) {
    throw error
  }
}
export const userController = {
  getUser,
  createUser
}