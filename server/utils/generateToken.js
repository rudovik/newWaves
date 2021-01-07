import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const sign = promisify(jwt.sign)

const generateToken = async (id) => {
  return await sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
