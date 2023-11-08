const mongoose = require('mongoose')
const { body } = require('express-validator')

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  comment: String,
  doctorId: { type: mongoose.ObjectId, ref: 'User' },
  patientId: { type: mongoose.ObjectId, ref: 'User' },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

exports.Appointment = Appointment

const appointmentValidation = body('date').notEmpty().isISO8601('yyyy-mm-dd')
body('doctorId').notEmpty()
body('patientId').notEmpty()

exports.appointmentValidation = appointmentValidation
