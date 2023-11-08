const { appointmentValidation } = require('../models/appointment')
const appointmentController = require('../controllers/appointment')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')
const validate = require('../middlewares/validate')

// const auth = require('../middlewares/auth')
// const admin = require('../middlewares/admin')

const { Router } = require('express')

const router = Router()

router.get('/', appointmentController.getAll)
router.post('/', appointmentValidation, validate, appointmentController.create)

router.put(
  '/:appointmentId',
  mongoIdFromParamValidation('appointmentId'),
  appointmentValidation,
  validate,
  appointmentController.update
)
router.delete(
  '/:appointmentId',
  mongoIdFromParamValidation('appointmentId'),
  validate,
  appointmentController.remove
)

module.exports = router
