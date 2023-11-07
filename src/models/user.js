const mongoose = require('mongoose')
// const { body } = require('express-validator')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  Email: { type: String, unique: true },
  role: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)

exports.User = User

// const genreValidation = body('name')
//   .notEmpty()

//   .custom(async name => {
//     const genre = await Genre.findOne({ name })

//     if (genre) throw new Error('Genre exists')
//   })

// exports.genreValidation = genreValidation
