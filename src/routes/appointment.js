const { appointmentValidation } = require('../models/appointment')
const appointmentController = require('../controllers/appointment')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')
const validate = require('../middlewares/validate')

const auth = require('../middlewares/auth')
const doctor = require('../middlewares/doctor')

const { Router } = require('express')

const router = Router()

router.get('/', auth, appointmentController.getAll)
router.post(
  '/',
  auth,
  appointmentValidation,
  validate,
  appointmentController.create
)

router.put(
  '/:appointmentId',
  auth,
  doctor,
  mongoIdFromParamValidation('appointmentId'),
  appointmentValidation,
  validate,
  appointmentController.update
)
router.delete(
  '/:appointmentId',
  auth,
  doctor,
  mongoIdFromParamValidation('appointmentId'),
  validate,
  appointmentController.remove
)

module.exports = router
