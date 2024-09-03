import express from 'express'
import { userRoute } from './userRoute'
import { authRoute } from './authRoute'
import { room_chatRoute } from './room_chatRoute'
import { messageRoute } from './messageRoute'
import { postRoute } from './postRoute'
import { commentRoute } from './commentRoute'
const Router = express.Router()

// Router.use(checkJWTToken)
Router.use('/auth', authRoute)
Router.use('/users', userRoute)
Router.use('/room_chats', room_chatRoute)
Router.use('/messages', messageRoute)
Router.use('/posts', postRoute)
Router.use('/comments', commentRoute)

export const APIs_V1 = Router
