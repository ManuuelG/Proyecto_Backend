const { prescriptionValidation } = require('../models/prescription')
const prescriptionController = require('../controllers/prescription')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')
const validate = require('../middlewares/validate')

const auth = require('../middlewares/auth')
const doctor = require('../middlewares/doctor')

const { Router } = require('express')

const router = Router()

router.get('/', prescriptionController.getAll)
router.get('/:prescriptionId', prescriptionController.getPrescriptionById)
router.post(
  '/',
  prescriptionValidation,
  validate,
  prescriptionController.create
)

router.put(
  '/:prescriptionId',
  mongoIdFromParamValidation('prescriptionId'),
  prescriptionValidation,
  validate,
  prescriptionController.update
)
router.delete(
  '/:prescriptionId',
  mongoIdFromParamValidation('prescriptionId'),
  validate,
  prescriptionController.remove
)

module.exports = router
