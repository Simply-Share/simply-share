const pathAdderMiddleware = (req, res, next) => {
  req.pathCode = req.originalUrl.split('/').slice(1).join('.')
  next()
}

export default pathAdderMiddleware
