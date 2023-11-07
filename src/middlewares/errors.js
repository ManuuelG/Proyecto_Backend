module.exports = function (err, req, res, next) {
  console.log(err)

  res.status(500).send('Estamos trabajando en que todo vuelva, gracias.')
}
