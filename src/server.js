import express from 'express'
import { APIs_V1 } from './routes/v1'
import { env } from '~/config/environment'
import { CONNECT_DB } from './config/mongodb'
import cors from 'cors'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'
import http from 'http'
import { Server } from 'socket.io'

const START_SERVER = () => {
  const app = express()
  const port = env.LOCAL_PORT

  app.use(cors(corsOptions))
  app.use(express.json())
  app.use('/v1', APIs_V1)
  app.use(errorHandlingMiddleware)
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: `${env.APP_PORT}`,
      methods: ['GET', 'POST']
    }
  })
  const onlineUsers = []
  io.on('connection', (socket) => {
    const typingUsers = []
    console.log('New client connected', socket.id)
    socket.on('room_signature', (id) => {
      socket.join(id)
    })
    socket.on('online', (id) => {
      const index = onlineUsers.indexOf(id)
      if (index === -1)
        onlineUsers.push(id)
      console.log('Online users:', onlineUsers)
    })
    socket.on('offline', (id) => {
      socket.leave(id)
      const index = onlineUsers.indexOf(id)
      if (index !== -1) {
        onlineUsers.splice(index, 1)
      }
    })
    socket.on('typing', (data) => {
      console.log('Typing:', data)
      typingUsers.push(data)
      io.to(data.room).emit('typing', typingUsers)
    })
    socket.on('untyping', (data) => {
      const index = typingUsers.findIndex((user) => user.user_id === data.user_id)
      if (index !== -1) {
        typingUsers.splice(index, 1)
      }
      io.to(data.room).emit('typing', typingUsers)
    })
    socket.on('join_room', (data) => {
      console.log('Joining room:', data)
      socket.join(data)
    })

    socket.on('leave_room', (data) => {
      console.log('Leaving room:', data)
      socket.leave(data)
    })

    socket.on('receive_message', (data) => {
      console.log('Message received:', data)
      io.to(data.room).emit('receive_message', data)
    })

    socket.on('join_notification', (data) => {
      console.log('Joining notification:', data)
      socket.join(data)
    })

    socket.on('leave_notification', (data) => {
      console.log('Leaving notification:', data)
      socket.leave(data)
    })

    socket.on('notification', (data) => {
      console.log('Notification:', data)
      socket.to(data.sender.user_id).emit('notification', data)
    })

    socket.on('send_comment', (data) => {
      console.log('Comment:', data)
      console.log('Post ID:', data.post_id)
      io.to(data.post_id).emit('receive_comment', data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id)
      const index = onlineUsers.indexOf(socket.id)
      if (index !== -1) {
        onlineUsers.splice(index, 1)
      }
      console.log('Online users:', onlineUsers)
    })
  })

  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
};

(async () => {
  try {
    console.log('1. Connecting to database...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB successfully!!!')
    START_SERVER()
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
})()

