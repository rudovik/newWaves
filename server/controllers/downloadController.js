import asyncHandler from 'express-async-handler'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)

export const getFiles = asyncHandler(async (req, res) => {
  const dir = path.resolve('.') + '/uploads/'
  const files = await readdir(dir)
  return res.status(200).send(files)
})
