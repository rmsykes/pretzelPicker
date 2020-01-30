
// import mongoose
const mongoose = require('./connection.js')


// user schema
const SampleModelSchema = new mongoose.Schema({
 name: String
})


// user api
const UserCollection = mongoose.model('User', UserSchema)


/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getHelloWorldString() {
  return 'hello world'
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getHelloWorldString
}
