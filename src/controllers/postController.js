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
    const files = req.files || []
    const data = {
      ...req.body,
      media: files.map((file) => file.path)
    }
    const result = await postService.createPost(data)
    return res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }
}
const updatePost = async (req, res, next) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).send('updatePost in postController is not implemented')
}
export const postController = {
  getPosts,
  createPost,
  updatePost
}