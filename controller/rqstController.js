const express = require('express')
require('dotenv').config
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const requestService = require('../service/rqstService')

router.get('/facilities', getFacilities)
router.get('/itequipment', getITEquipments)

function getFacilities(req, res, next){
    requestService.getFacilities()
    .then((response) => response ? res.status(200).json(response): (res.status(404).send()))
    .catch(next)
}

function getITEquipments(req, res, next){
    requestService.getITEquipments()
    .then((response) => response ?  res.status(200).send(response):  res.status(404).send())
    .catch(next)
}



module.exports = router

