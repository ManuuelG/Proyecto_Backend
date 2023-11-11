const { prescriptionValidation } = require('../models/prescription')
const prescriptionController = require('../controllers/prescription')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParam')
const validate = require('../middlewares/validate')

const auth = require('../middlewares/auth')
const doctor = require('../middlewares/doctor')

const { Router } = require('express')

const router = Router()

router.get('/', auth, prescriptionController.getAll)
router.get('/:prescriptionId', auth, prescriptionController.getPrescriptionById)
router.post(
  '/',
  auth,
  doctor,
  prescriptionValidation,
  validate,
  prescriptionController.create
)

router.put(
  '/:prescriptionId',
  auth,
  doctor,
  mongoIdFromParamValidation('prescriptionId'),
  prescriptionValidation,
  validate,
  prescriptionController.update
)
router.delete(
  '/:prescriptionId',
  auth,
  doctor,
  mongoIdFromParamValidation('prescriptionId'),
  validate,
  prescriptionController.remove
)

module.exports = router
