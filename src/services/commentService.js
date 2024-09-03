import { commentModel } from '~/models/commentModel'

const getCommentsByPostId = async (postId) => {
  try {
    const result = await commentModel.getCommentsByPostId(postId)
    return result
  }
  catch (error) {
    throw new Error(error)
  }
}
const createComment = async (data) => {
  try {
    const result = await commentModel.createComment(data)
    return result
  }
  catch (error) {
    throw new Error(error)
  }
}
export const commentService = {
  getCommentsByPostId,
  createComment
}