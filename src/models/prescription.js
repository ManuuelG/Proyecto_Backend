const mongoose = require('mongoose')
const { body } = require('express-validator')

const prescriptionSchema = new mongoose.Schema({
  emision: { type: String, required: true },
  medicamento: { type: String, required: true },
  duracion: { type: String, required: true },

  // users: [{ type: mongoose.ObjectId, ref: 'User' }],
})

const Prescription = mongoose.model('Prescription', prescriptionSchema)

const prescriptionValidation = body('emision').notEmpty()

// body('Comentario').notEmpty(),
// body('genres').isArray(),

exports.prescriptionValidation = prescriptionValidation

exports.Prescription = Prescription
