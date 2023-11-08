const mongoose = require('mongoose')
const { body } = require('express-validator')

const prescriptionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  medicine: { type: String, required: true },
  duration: { type: String, required: true },
  doctorId: [{ type: mongoose.ObjectId, ref: 'User' }],
  patientId: [{ type: mongoose.ObjectId, ref: 'User' }],
})

const Prescription = mongoose.model('Prescription', prescriptionSchema)

const prescriptionValidation = body('date').notEmpty()

// body('Comentario').notEmpty(),
// body('genres').isArray(),

exports.prescriptionValidation = prescriptionValidation

exports.Prescription = Prescription
