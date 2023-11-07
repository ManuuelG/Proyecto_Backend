const { param } = require('express-validator')

module.exports = field => param(field).isMongoId()
