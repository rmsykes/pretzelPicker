// IMPORT MONGOOSE
const mongoose = require('./connection.js')



// CREATE PRETZEL SCEMA
const PretzelSchema = new mongoose.Schema({
  restaurantName: String,
  price: Number,
  cheese: Boolean,
  mustard: Boolean,
  ranking: Number,
  notes: String,
  photo: String,
  userId: String
})

// CREATE PRETZEL API
const PretzelCollection = mongoose.model('Pretzel', PretzelSchema)



// CRUD FUNCTIONS

// getAllPretzels()
const getAllPretzels = () => {
  return PretzelCollection.find()
}

// getOnePretzel()
const getOnePretzel = (pretzelId) => {
  return PretzelCollection.findById(pretzelId)
}

// getAllPretzelsByUserId()
const getAllPretzelsByUserId = (userId) => {
  return PretzelCollection.find({ userId: userId })
}

// createPretzel()
const createPretzel = (pretzelData) => {
  return PretzelCollection.create(pretzelData)
}

// updatePretzel()
const updatePretzel = (pretzelId, pretzelData) => {
  return PretzelCollection.updateOne({ _id: pretzelId }, pretzelData)
}

// deletePretzel()
const deletePretzel = (pretzelId) => {
  return PretzelCollection.deleteOne({ _id: pretzelId })
}


// EXPORT
module.exports = {
  getAllPretzels,
  getOnePretzel,
  getAllPretzelsByUserId,
  createPretzel,
  updatePretzel,
  deletePretzel
}
