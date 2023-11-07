const { Appointment } = require('../models/appointment')

const create = async (req, res) => {
  const newAppointment = await Appointment.create(req.body)

  res.json(newAppointment)
}

const getAll = async (req, res) => {
  const appointments = await Appointment.find()

  res.json(appointments)
}

const getAppointmentById = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId)

  res.json(appointment)
}

const update = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.appointmentId,
    req.body,
    {
      //REVISAR
      new: true,
    }
  )

  res.json(appointment)
}

const remove = async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(
    req.params.appointmentId
  ) // REVISAR

  res.json(appointment)
}

module.exports = {
  create,
  getAll,
  getAppointmentById,
  update,
  remove,
}
