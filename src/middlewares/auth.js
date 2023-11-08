const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log(req.headers)

  const token = req.headers['x-auth-token']

  if (!token) return res.status(401).json({ msg: 'No hay token de acceso.' })

  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.privateKey)

    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ msg: 'token invalido.' })
  }
}
