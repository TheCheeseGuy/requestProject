const express = require('express')
require('dotenv').config
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const requestService = require('../service/rqstService')

router.post('/request', requestSchema, request)

function requestSchema(req, res, next) {
    const schema = Joi.object({
        nameOfSponsor: Joi.string().required(),
        numberOfGuest: Joi.string().required(),
        descriptionOfEvent: Joi.string().required(),
        eventTiming: Joi.object().required(),
        foodBeverage: Joi.string().required(),
        facilityDetails: Joi.array().required(),
        facilityDept: Joi.object().required(),
        itDept: Joi.object().required()
    })
    validateRequest(req, next, schema)
}

function request(req, res, next) {
    console.log(req.body)
    requestService.submit(req.body)
        .then((response) => response ? res.status(200).json(response) : (res.status(404).send()))
        .catch(next)
}

module.exports = router

