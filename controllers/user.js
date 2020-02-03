// import express
const express = require('express')

// import user and year api from model
const UserApi = require('../models/user.js')
const PretzelApi = require('../models/pretzel.js')

// user router
const UserRouter = express.Router()

// user request handlers

// getAllUsers()
UserRouter.get('/', (req, res) => {
  UserApi.getAllUsers()
    .then((allUsers) => {
      res.json(allUsers)
    })
})

// getOneUser()
UserRouter.get('/:userId', (req, res) => {
  UserApi.getOneUser(req.params.userId)
    .then((singleUser) => {
      res.json(singleUser)
    })
})


// getOneUser() with getAllPretzelsByUserId()
// UserRouter.get('/:userId', (req, res) => {
//   UserApi.getOneUser(req.params.userId)
//     .then((singleUser) => {

//       PretzelApi.getAllPretzelsByUserId(req.params.userId)
//         .then((usersPretzels) => {
//         res.json(singleUser, usersPretzels)

//       })
// })

// createUser()
UserRouter.post('/', (req, res) => {
  UserApi.createUser(req.body)
    .then((createdUser) => {
      res.json(createdUser)
    })
})

// updateUser()
UserRouter.put('/:userId', (req, res) => {
  UserApi.updateUser(req.params.userId, req.body)
    .then((updatedUser) => {
      res.json(updatedUser)
    })
})

// deleteUser()
UserRouter.delete('/:userId', (req, res) => {
  UserApi.deleteUser(req.params.userId)
    .then((deletedUser) => {
      res.json(deletedUser)
    })
})


// export router
module.exports = {
  UserRouter
}
