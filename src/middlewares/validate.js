const { validationResult } = require('express-validator')
const { isEmpty } = require('lodash')

module.exports = function (req, res, next) {
  const { errors } = validationResult(req)

  if (!isEmpty(errors)) {
    const errorsResponse = errors.reduce((acc, item) => {
      acc[item.path] = !acc[item.path]
        ? [item.msg]
        : [...acc[item.path], item.msg]

      return acc
    }, {})

    return res.status(400).json(errorsResponse)
  }

  next()
}
