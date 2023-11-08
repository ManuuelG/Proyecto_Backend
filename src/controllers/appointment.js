const { Appointment } = require('../models/appointment')

const getAll = async (req, res) => {
  const { date } = req.query

  if (date) {
    const appointments = await Appointment.find({ date })
    if (appointments.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron citas en la fecha que has proporcionado',
      })
    }
    return res.json(appointments)
  } else {
    const allAppointments = await Appointment.find()
    return res.json(allAppointments)
  }
}

const create = async (req, res) => {
  try {
    const { comment, doctorId, patientId, date } = req.body

    if (!(doctorId || patientId)) {
      return res
        .status(400)
        .json({ error: 'Debes proporcionar doctorId o pacienteId.' })
    }

    const newAppointment = new Appointment({
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
