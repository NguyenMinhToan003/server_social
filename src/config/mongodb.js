import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
import 'dotenv/config'
let socialClientInstance = null
const clientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// ket noi database
export const CONNECT_DB = async () => {
  // goi ket noi database voi MONGO_URI
  await clientInstance.connect()
  // ket noi thanh cong thi truy cap database voi MONGO_NAME
  socialClientInstance = clientInstance.db(env.MONGODB_NAME)
}
export const GET_DB = () => {
  if (!socialClientInstance) throw new Error('Missing connect database!!!')
  return socialClientInstance
}
export const CLOSE_DB = async () => {
  await clientInstance.close()
}