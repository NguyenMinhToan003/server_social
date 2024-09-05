import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_REGEX, OBJECT_ID_MESSAGE } from '~/utils/validation'
import { userModel } from '~/models/userModel'
const POST_COLLECTION_NAME = 'posts'
const POSTSCHEMA = Joi.object({
  author_id: Joi.string().required().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE),
  title: Joi.string().required().min(3).max(100).default(''),
  content: Joi.string().default(''),
  media: Joi.array().items(Joi.string()).default([]),
  comment_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  like_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_REGEX).message(OBJECT_ID_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null)
})
const findAll = async () => {
  try {
    return await GET_DB().collection(POST_COLLECTION_NAME).aggregate([
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
          title: 1,
          content: 1,
          media: 1,
          comments: 1,
          likes: 1,
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
const createPost = async (post) => {
  try {
    const data = await POSTSCHEMA.validateAsync(post)
    data.author_id = new ObjectId(data.author_id)
    return await GET_DB().collection(POST_COLLECTION_NAME).insertOne(data)
  }
  catch (error) {
    throw new Error(error)
  }
}
export const postModel = {
  POSTSCHEMA,
  POST_COLLECTION_NAME,
  findAll,
  createPost
}