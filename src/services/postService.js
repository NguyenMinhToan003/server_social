import { postModel } from '~/models/postModel'

const getPosts = async () => {
  try {
    const posts = await postModel.findAll()
    return posts
  }
  catch (error) {
    throw error
  }
}
const createPost = async (post) => {
  try {
    const data = {
      ...post,
      comment_ids: [],
      like_ids: [],
      createdAt: new Date()
    }
    const result = await postModel.createPost(data)
    return result
  }
  catch (error) {
    throw error
  }
}
export const postService = {
  getPosts,
  createPost
}
