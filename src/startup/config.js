module.exports = function () {
  if (!process.env.privateKey) {
    console.error('privateKey is not defined')
    process.exit(0)
  }
}
