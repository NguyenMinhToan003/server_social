import { authService } from '~/services/authService.js'
import { StatusCodes } from 'http-status-codes'
const login = async (req, res, next) => {
  try {
    const { account, password } = req.body
    const result = await authService.login(account, password)
    if (result === null) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid account or password' })
    }
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    next(error)
  }
}
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body)
    if (result.error) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}
export const authController = {
  login,
  register
}
