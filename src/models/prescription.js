const mongoose = require('mongoose')
const { body } = require('express-validator')

const prescriptionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  medicine: { type: String, required: true },
  duration: { type: String, required: true },
  patientId: { type: mongoose.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.ObjectId, ref: 'User' },
})

const Prescription = mongoose.model('Prescription', prescriptionSchema)

const prescriptionValidation = body('date').notEmpty()
body('patientId').notEmpty()

exports.prescriptionValidation = prescriptionValidation

exports.Prescription = Prescription
