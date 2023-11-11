const { Prescription } = require('../models/prescription')
const { User } = require('../models/user')

const getAll = async (req, res) => {
  try {
    const { name, id } = req.user

    const userPrescriptions = await Prescription.find({
      $or: [{ patientId: id }, { doctorId: id }, { username: name }],
    })
    return res.json(userPrescriptions)
  } catch (error) {
    return res.status(500).json({ msg: 'Algo inesperado ha ocurrido' })
  }
}

const getPrescriptionById = async (req, res) => {
  try {
    const { name, id } = req.user
    const { prescriptionId } = req.params

    const prescription = await Prescription.findById(prescriptionId)

    if (!prescription) {
      return res.status(404).json({ error: 'La receta no existe.' })
    }

    console.log(prescription.patientId.toString())
    console.log(id)
    if (
      prescription.username === name ||
      prescription.patientId.toString() === id
    ) {
      res.json(prescription)
    } else {
      return res
        .status(500)
        .json({ msg: 'No tienes permiso para ver esta receta' })
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Algo inesperado ha ocurrido' })
  }
}

const create = async (req, res) => {
  try {
    const { username, date, medicine, duration, patientId } = req.body

    const patientUser = await User.findById(patientId)
    if (!patientUser || patientUser.role !== 'Patient') {
      return res.status(403).json({
        error: 'El ID proporcionado no corresponde a un paciente.',
      })
    }

    const existingPrescription = await Prescription.findOne({
      username,
      date,
      medicine,
      duration,
      patientId,
    })
    if (existingPrescription) {
      return res.status(400).json({ error: 'La receta ya existe' })
    }

    if (!patientId) {
      return res.status(400).json({ error: 'Debes proporcionar pacienteId.' })
    }

    const newPrescription = new Prescription({
      username,
      date: date.toString(),
      medicine,
      duration,
      patientId,
    })

    const createdPrescription = await newPrescription.save()

    return res.status(201).json(createdPrescription)
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Ha ocurrido un error al crear la receta.' })
  }
}

const update = async (req, res) => {
  try {
    const { name, id } = req.user

    const { date, medicine, duration } = req.body

    const { prescriptionId } = req.params

    const existingPrescription = await Prescription.findById(prescriptionId)

    if (!existingPrescription) {
      return res.status(404).json({ error: 'La receta no existe.' })
    }

    if (
      existingPrescription.username === name ||
      existingPrescription.patientId.toString() === id ||
      existingPrescription.doctorId.toString() === id
    ) {
      existingPrescription.medicine = medicine
      existingPrescription.date = date
      existingPrescription.duration = duration

      const updatedPrescription = await existingPrescription.save()

      return res.status(200).json(updatedPrescription)
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'No tienes permiso para modificar esta receta' })
  }
}

const remove = async (req, res) => {
  try {
    const { name, id } = req.user

    const { prescriptionId } = req.params

    const existingPrescription = await Prescription.findById(prescriptionId)

    if (
      existingPrescription.username === name ||
      existingPrescription.doctorId.toString() === id
    ) {
      console.log('Estás autorizado')
    }

    const deletedPrescription = await Prescription.findByIdAndDelete(
      prescriptionId
    )
    return res.json(deletedPrescription)
  } catch {
    return res.status(500).json({
      error: 'No tienes permiso para eliminar esta receta',
    })
  }
}

module.exports = {
  getAll,
  getPrescriptionById,
  create,
  update,
  remove,
}
