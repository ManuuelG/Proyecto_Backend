const { Prescription } = require('../models/prescription')

const create = async (req, res) => {
  const newPrescription = await Prescription.create(req.body)

  res.json(newPrescription)
}

const getAll = async (req, res) => {
  const prescriptions = await Prescription.find()

  res.json(prescriptions)
}

const getPrescriptionById = async (req, res) => {
  const prescription = await Prescription.findById(req.params.prescriptionId)

  res.json(prescription)
}

const update = async (req, res) => {
  const prescription = await Prescription.findByIdAndUpdate(
    req.params.prescriptionId,
    req.body,
    {
      //REVISAR
      new: true,
    }
  )

  res.json(prescription)
}

const remove = async (req, res) => {
  const prescription = await Prescription.findByIdAndDelete(
    req.params.prescriptionId
  ) // REVISAR

  res.json(prescription)
}

module.exports = {
  create,
  getAll,
  getPrescriptionById,
  update,
  remove,
}
