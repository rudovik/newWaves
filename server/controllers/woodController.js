import asyncHandler from 'express-async-handler'
import Wood from '../models/woodModel.js'

const addWood = asyncHandler(async (req, res) => {
  const wood = new Wood(req.body)

  await wood.save()

  res.status(200).json({
    success: true,
    wood,
  })
})

const getWoods = asyncHandler(async (req, res) => {
  const woods = await Wood.find({})
  res.status(200).json({ woods })
})

export { addWood, getWoods }
