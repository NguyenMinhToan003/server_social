import { StatusCodes } from 'http-status-codes'
import { messageService } from '~/services/messageService'
const getMessages = async (req, res, next) => {
  try {
    const { room_chat_id, user_id } = req.params
    const messages = await messageService.getMessages(room_chat_id, user_id)
    return res.status(StatusCodes.OK).json(messages)
  }
  catch (error) {
    next(error)
  }
}
const createMessage = async (req, res, next) => {
  try {
    const result = await messageService.createMessage(req.body)
    if (result.error) {
      return res.status(StatusCodes.BAD_REQUEST).json(result)
    }
    return res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    next(error)
  }
}
export const messageController = {
  getMessages,
  createMessage
}