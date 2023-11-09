const { Prescription } = require('../models/prescription')

const getAll = async (req, res) => {
  try {
    const userId = req.user.id

    const userPrescriptions = await Prescription.find({
      $or: [{ patientId: userId }, { doctorId: userId }],
    })

    return res.json(userPrescriptions)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Algo inesperado ha ocurrido' })
  }
}

const getPrescriptionById = async (req, res) => {
  try {
    const userId = req.user.id
    const prescription = await Prescription.findById(req.params.prescriptionId)

    res.json(prescription)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Algo inesperado ha ocurrido' })
  }
}

const create = async (req, res) => {
  const newPrescription = await Prescription.create(req.body)

  res.json(newPrescription)
}

const update = async (req, res) => {
  const prescription = await Prescription.findByIdAndUpdate(
    req.params.prescriptionId,
    req.body,
    {
      new: true,
    }
  )

  res.json(prescription)
}

const remove = async (req, res) => {
  const prescription = await Prescription.findByIdAndDelete(
    req.params.prescriptionId
  )

  res.json(prescription)
}

module.exports = {
  getAll,
  getPrescriptionById,
  create,
  update,
  remove,
}
