import { StatusCodes } from 'http-status-codes'
import { postService } from '~/services/postService'
const getPosts = async (req, res, next) => {
  try {
    const result = await postService.getPosts()
    return res.status(StatusCodes.OK).json(result)
  }
  catch (error) {
    next(error)
  }
}
const createPost = async (req, res, next) => {
  try {
    const result = await postService.createPost(req.body)
    return res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}
export const postController = {
  getPosts,
  createPost
}