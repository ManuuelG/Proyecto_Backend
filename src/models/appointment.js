const mongoose = require('mongoose')
const { body } = require('express-validator')

const appointmentSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  emision: { type: String, required: true },
  Comentario: String,
  // users: [{ type: mongoose.ObjectId, ref: 'User' }],
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

exports.Appointment = Appointment

const appointmentValidation = body('estado').notEmpty()

exports.appointmentValidation = appointmentValidation
