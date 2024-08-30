import express from 'express'
import { userRoute } from './userRoute'
import { authRoute } from './authRoute'
const Router = express.Router()

Router.use('/auth', authRoute)
Router.use('/users', userRoute)
export const APIs_V1 = Router