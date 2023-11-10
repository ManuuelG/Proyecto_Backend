const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Router } = require('express')
const { body, validationResult } = require('express-validator')

const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')

const { User } = require('../models/user')

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password: passwordPlainText } = req.body

  const user = await User.findOne({ username })

  if (!user)
    return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' })

  const isValidUser = await bcrypt.compare(passwordPlainText, user.password)

  if (!isValidUser)
    return res.status(400).json({ msg: 'Usuario o contraseña incorrecto' })

  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.username },
    process.env.privateKey
  )

  res.setHeader('x-auth-token', token)
  res.json({ msg: 'Usuario logueado' })
})

router.post(
  '/register',
  body('email').custom(async email => {
    const user = await User.findOne({ email })

    if (user) throw new Error('Vuelve a intentarlo más tarde')
  }),
  async (req, res) => {
    const { username, password: passwordPlainText, role, ...rest } = req.body

    const user = await User.findOne({ username })
    if (user)
      return res.status(400).json({ msg: 'Vuelve a intentarlo más tarde' })

    const { errors } = validationResult(req)

    if (errors.length)
      return res.status(400).send({ msg: 'Vuelve a intentarlo más tarde' })

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(passwordPlainText, salt)

    const newUser = await User.create({
      username,
      password,
      ...rest,
    })

    const token = jwt.sign({ id: newUser._id }, process.env.privateKey)

    res.setHeader('x-auth-token', token)
    res.json({ msg: 'Usuario registrado' })
  }
)

router.put('/assign_role', auth, admin, async (req, res) => {
  try {
    const { userId, role } = req.body

    const userUpdated = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    )

    if (!userUpdated) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'Role assigned succesfully', user: userUpdated })
  } catch (error) {
    res.status(500).json({ message: 'Error at assigning role' })
  }
})

module.exports = router
