import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.getUser(id)
    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
    }
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const result = await userService.updateUser(id, data)
    if (result.error) {
      return res.status(StatusCodes.NOT_FOUND).json(result)
    }
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
const getListUser = async (req, res, next) => {
  try {
    const users = await userService.getListUser()
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}
const getFriends = async (req, res, next) => {
  try {
    const { id } = req.params
    const friends = await userService.getFriends(id)
    res.status(StatusCodes.OK).json(friends)
  } catch (error) {
    next(error)
  }
}
const addFriend = async (req, res, next) => {
  try {
    const { id } = req.params
    const { friend_id } = req.body
    const result = await userService.addFriend(id, friend_id)
    if (result.error) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
const searchUser = async (req, res, next) => {
  try {
    const { q } = req.params
    const users = await userService.searchUser(q)
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}
const searchUserByListId = async (req, res, next) => {
  try {
    const { ids } = req.body
    const users = await userService.searchUserByListId(ids)
    res.status(StatusCodes.OK).json(users)
  }
  catch (error) {
    next(error)
  }
}
export const userController = {
  getUser,
  updateUser,
  getListUser,
  getFriends,
  addFriend,
  searchUser,
  searchUserByListId
}