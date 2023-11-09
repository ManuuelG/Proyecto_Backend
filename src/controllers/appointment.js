const { Appointment } = require('../models/appointment')

const getAll = async (req, res) => {
  try {
    const userId = req.user.id

    const userAppointments = await Appointment.find({
      $or: [{ patientId: userId }, { doctorId: userId }],
    })

    return res.json(userAppointments)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Algo inesperado ha ocurrido' })
  }
}

const create = async (req, res) => {
  try {
    const { username, comment, doctorId, patientId, date } = req.body

    const userRole = req.user.role

    if (userRole === 'Doctor' && doctorId) {
      return res.status(403).json({
        error: 'Los doctores no pueden asignar citas a otros doctores',
      })
    }

    if (userRole === 'Patient' && patientId) {
      return res.status(403).json({
        error: 'Los pacientes no pueden asignar citas a otros pacientes',
      })
    }

    const existingAppointment = await Appointment.findOne({
      date,
      doctorId,
      patientId,
    })
    if (existingAppointment) {
      return res.status(400).json({ error: 'La cita ya existe' })
    }

    if (!(doctorId || patientId)) {
      return res
        .status(400)
        .json({ error: 'Debes proporcionar doctorId o pacienteId.' })
    }

    const newAppointment = new Appointment({
      username,
      comment,
      doctorId,
      patientId,
      date: date.toString(),
    })

    const createdAppointment = await newAppointment.save()

    return res.status(201).json(createdAppointment)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Ha ocurrido un error al crear la cita.' })
  }
}

const update = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.appointmentId,
    req.body,
    {
      new: true,
    }
  )

  res.json(appointment)
}

const remove = async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(
    req.params.appointmentId
  )

  res.json(appointment)
}

module.exports = {
  getAll,
  create,
  update,
  remove,
}
