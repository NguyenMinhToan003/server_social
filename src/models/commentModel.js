import Joi from 'joi'
import { userModel } from './userModel'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
const COMMENT_COLLECTION_NAME = 'comments'
const COMMENT_SCHEMA = Joi.object({
  post_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  author_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  content: Joi.string().required().min(3).max(1000).default(''),
  like: Joi.number().default(0),
  dislike: Joi.number().default(0),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})

const getCommentsByPostId = async (postId) => {
  try {
    return await GET_DB().collection(COMMENT_COLLECTION_NAME).aggregate([
      { $match: { post_id: new ObjectId(postId) } },
      {
        $lookup: {
          from: userModel.USER_COLLECTION_NAME,
          localField: 'author_id',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $project: {
          _id: 1,
          post_id: 1,
          author_id: 1,
          content: 1,
          like: 1,
          dislike: 1,
          createdAt: 1,
          updatedAt: 1,
          'author._id': 1,
          'author.username': 1,
          'author.email': 1,
          'author.profile_picture': 1
        }
      }
    ]).toArray()
  }
  catch (error) {
    throw new Error(error)
  }
}
const createComment = async (data) => {
  try {
    data = await COMMENT_SCHEMA.validateAsync(data)
    data.post_id = new ObjectId(data.post_id)
    data.author_id = new ObjectId(data.author_id)
    const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).insertOne(data)
    return result
  }
  catch (error) {
    throw new Error(error)
  }
}
export const commentModel = {
  COMMENT_COLLECTION_NAME,
  COMMENT_SCHEMA,
  getCommentsByPostId,
  createComment
}