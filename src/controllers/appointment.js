const { Appointment } = require('../models/appointment')
const { User } = require('../models/user')

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

    if (userRole === 'Doctor') {
      if (doctorId || !patientId) {
        return res.status(403).json({
          error: 'Un doctor solo puede proporcionar un pacienteId válido.',
        })
      }

      const patientUser = await User.findById(patientId)
      if (!patientUser || patientUser.role !== 'Patient') {
        return res.status(403).json({
          error: 'El ID proporcionado no corresponde a un paciente.',
        })
      }
    }

    if (userRole === 'Patient') {
      if (patientId || !doctorId) {
        return res.status(403).json({
          error: 'Un paciente solo puede proporcionar un DoctorId válido.',
        })
      }

      const doctorUser = await User.findById(doctorId)
      if (!doctorUser || doctorUser.role !== 'Doctor') {
        return res.status(403).json({
          error: 'El ID proporcionado no corresponde a un doctor.',
        })
      }
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
  try {
    const { name, id } = req.user

    const { comment, date } = req.body

    const { appointmentId } = req.params

    const existingAppointment = await Appointment.findById(appointmentId)
    if (!existingAppointment) {
      return res.status(404).json({ error: 'La cita no existe.' })
    }

    if (
      existingAppointment.username === name ||
      existingAppointment.patientId.toString() === id ||
      existingAppointment.doctorId.toString() === id
    ) {
      existingAppointment.comment = comment || existingAppointment.comment
      existingAppointment.date = date || existingAppointment.date

      const updatedAppointment = await existingAppointment.save()

      return res.status(200).json(updatedAppointment)
    }
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Ha ocurrido un error al modificar la cita.' })
  }
}

const remove = async (req, res) => {
  //Comprobar si antes de hacer el delete, la id de la cita corresponde con la de ese doctor

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
