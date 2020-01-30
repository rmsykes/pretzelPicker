// import mongoose
const mongoose = require('./connection.js')

// user schema
const UserSchema = new mongoose.Schema({
 name: String,
 photo: String
})

// user api
const UserCollection = mongoose.model('User', UserSchema)


// crud functions

// getAllUsers()
const getAllUsers = () => {
  return UserCollection.find()
}

// getOneUser()
const getOneUser = (userId) => {
  return UserCollection.findById(userId)
}

// createUser()
const createUser = (userData) => {
  return UserCollection.create(userData)
}

// updateUser()
const updateUser = (userId, userData) => {
  return UserCollection.updateOne({ _id: userId }, userData)
}

// deleteUser()
const deleteUser = (userId) => {
  return UserCollection.deleteOne({ _id: userId})
}


module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}
