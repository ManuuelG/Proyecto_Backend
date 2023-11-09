const mongoose = require('mongoose')
const { body } = require('express-validator')

const appointmentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  comment: String,
  doctorId: { type: mongoose.ObjectId, ref: 'User' },
  patientId: { type: mongoose.ObjectId, ref: 'User' },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

exports.Appointment = Appointment

const appointmentValidation = body('date').notEmpty()
body('doctorId').notEmpty()
body('patientId').notEmpty()

exports.appointmentValidation = appointmentValidation
