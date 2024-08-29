import express from 'express'
import { APIs_V1 } from './routes/v1'
import { env } from '~/config/environment'
import { CONNECT_DB } from './config/mongodb'
import cors from 'cors'
import { corsOptions } from './config/cors'
const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  const port = env.LOCAL_PORT
  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running Production ${port}`)
  })

}
(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('1. connecting to database...')
    CONNECT_DB()
    // eslint-disable-next-line no-console
    console.log('2. Connected to database MongoDB cloud successfully!!!')
    START_SERVER()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit(0)
  }
})()