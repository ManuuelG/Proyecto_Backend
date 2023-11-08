module.exports = (req, res, next) => {
  const { role } = req.user

  if (role === 'Doctor') {
    next()
  } else {
    console.log('estas jodio')
    res.status(403).json({ message: 'Access forbidden' })
  }
}
