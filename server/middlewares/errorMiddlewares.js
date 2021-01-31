const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === 200
      ? 500
      : process.env.NODE_ENV === 'production'
      ? 500
      : res.statusCode
  res.status(statusCode).json({
    message:
      process.env.NODE_ENV === 'production' ? 'Server Error' : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
