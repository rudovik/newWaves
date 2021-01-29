import asyncHandler from 'express-async-handler'
import Site from '../models/siteModel.js'
// import mongoose from 'mongoose'

export const getSiteInfo = asyncHandler(async (req, res) => {
  const site = await Site.find({})
  res.status(200).json(site[0].siteInfo)
})

export const updateSiteInfo = asyncHandler(async (req, res) => {
  const { siteInfo } = await Site.findOneAndUpdate(
    { name: 'Site' },
    { $set: { siteInfo: req.body } },
    { new: true }
  )

  return res.status(200).json({
    success: true,
    siteData: siteInfo,
  })
})
