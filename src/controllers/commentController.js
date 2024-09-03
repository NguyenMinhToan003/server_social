import { StatusCodes } from 'http-status-codes'
import { commentService } from '~/services/commentService'

const getCommentsByPostId = async (req, res, next) => {
  try {
    const id = req.params.post_id
    const result = await commentService.getCommentsByPostId(id)
    res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    next(error)
  }
}

const createComment = async (req, res, next) => {
  try {
    const data = req.body
    const result = await commentService.createComment(data)
    res.status(StatusCodes.CREATED).json(result)
  }
  catch (error) {
    next(error)
  }
}
export const commentController = {
  getCommentsByPostId,
  createComment
}