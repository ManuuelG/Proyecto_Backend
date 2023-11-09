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
  try {
    const { username, date, medicine, duration, doctorId, patientId } = req.body
    console.log(req.user.role)

    const userRole = req.user.role

    if (userRole === 'Doctor' && doctorId) {
      return res.status(403).json({
        error: 'Los doctores no pueden asignar recetas a otros doctores',
      })
    }

    const existingPrescription = await Prescription.findOne({
      medicine,
      patientId,
    })
    if (existingPrescription) {
      return res.status(400).json({ error: 'La receta ya existe' })
    }

    // if (!doctorId) {
    //   return res.status(400).json({ error: 'Debes proporcionar doctorId' })
    // }

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
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Ha ocurrido un error al crear la cita.' })
  }
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
