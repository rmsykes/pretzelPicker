// IMPORT EXPRESS
const express = require('express')

// IMPORT PRETZEL API
const PretzelApi = require('../models/pretzel.js')

// CREATE PRETZEL ROUTER
const PretzelRouter = express.Router()


// REQUEST HANDLERS

// getAllPretzels()
PretzelRouter.get('/', (req, res) => {
  PretzelApi.getAllPretzels()
    .then((allPretzels) => {
      res.json(allPretzels)
    })
})

// getOnePretzel()
PretzelRouter.get('/:pretzelId', (req, res) => {
  PretzelApi.getOnePretzel(req.params.pretzelId)
    .then((singlePretzel) => {
      res.json(singlePretzel)
    })
})

// createPretzel()
PretzelRouter.post('/', (req, res) => {
  PretzelApi.createPretzel(req.body)
    .then((createdPretzel) => {
      res.json(createdPretzel)
    })
})

// updatePretzel()
PretzelRouter.put('/:pretzelId', (req, res) => {
  PretzelApi.updatePretzel(req.params.pretzelId, req.body)
    .then((updatedPretzel) => {
      res.json(updatedPretzel)
    })
})

// deletePretzel()
PretzelRouter.delete('/:pretzelId', (req, res) => {
  PretzelApi.deletePretzel(req.params.pretzelId)
    .then((deletedPretzel) => {
      res.json(deletedPretzel)
    })
})


// EXPORT PRETZEL ROUTER
module.exports = {
  PretzelRouter
}
