const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const port = process.env.PORT || 4000
const index = require('./routes/index')
const { Server } = require('socket.io')
app.use(cors())
const app = express()

app.use(express.json()) // Add if you need to parse JSON request bodies
app.use(index)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('New client connected', socket.id)
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
})

server.listen(port, () => console.log(`Listening on port ${port}`))
