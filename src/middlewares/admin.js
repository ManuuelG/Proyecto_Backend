module.exports = (req, res, next) => {
  const role = req.userId
  console.log(req.userId)

  if (role === 'Admin') {
    next()
  } else {
    console.log('estas jodio')
    res.status(403).json({ message: 'Access forbidden' })
  }
}
