import express from 'express'
import { userRoute } from './userRoute'
import { authRoute } from './authRoute'
import { room_chatRoute } from './room_chatRoute'
import { messageRoute } from './messageRoute'
import { postRoute } from './postRoute'
import { commentRoute } from './commentRoute'
import { notificationRoute } from './notificationRoute'
const Router = express.Router()

// Router.use(checkJWTToken)
Router.use('/auth', authRoute)
Router.use('/users', userRoute)
Router.use('/room_chats', room_chatRoute)
Router.use('/messages', messageRoute)
Router.use('/posts', postRoute)
Router.use('/comments', commentRoute)
Router.use('/notifications', notificationRoute)

export const APIs_V1 = Router
