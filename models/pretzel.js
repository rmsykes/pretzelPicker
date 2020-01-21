// IMPORT MONGOOSE
const mongoose = require('./connection.js')



// CREATE SCEMA
const PretzelSchema = new mongoose.Schema({
 name: String
})

// CREATE PRETZEL API
const PretzelCollection = mongoose.model('Pretzel', PretzelSchema)



// CRUD FUNCTIONS

// getAllPretzels()

// getOnePretzel()

// createPretzel()

// updatePretzel()

// deletePretzel()



// EXPORT
module.exports = {
  getHelloWorldString
}
