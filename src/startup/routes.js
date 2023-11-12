require('express-async-errors')
const { json } = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

module.exports = function (app) {
  app.use(helmet())
  app.use(compression())
  app.use(json())
  app.use(morgan('dev'))

  app.use('/api/users', require('../routes/users'))
  app.use('/api/appointments', require('../routes/appointment'))
  app.use('/api/prescriptions', require('../routes/prescription'))

  app.get('/ping', (req, res) => {
    res.send({ success: true })
  })

  app.use(require('../middlewares/errors'))
}
