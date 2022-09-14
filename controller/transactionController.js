const express = require('express')
require('dotenv').config
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const transactionService = require('../service/transactionService')
const { credential, url } = require('../config.json')
const crypto = require('crypto')

router.post('/initiate', getInitiateSchema, initiate)
router.get('/pay/:id', pay)
router.post('/return', returnFunc )
router.get('/status/:id', checkStatus)

function checkStatus(req, res, next){
    transactionService.statusCheck(req.params.id)
    .then((response) => response ? (res.status(200).send(response)) : (res.status(404).send()))
    .catch(next)
}

function returnFunc (req, res, next ){
    transactionService.returnCall(req.body)
    .then((response => {
        switch (response) {
            case "success":
                //res.render('success')
                res.redirect("https://trustremit.africa/user/transaction")
                break;        
            default:
                res.redirect("https://trustremit.africa/user/transaction")
                // axios post to the return url of the shopping cart
                break;
        }
    }))
    .catch(next)
}

function getInitiateSchema(req, res, next) {
    const schema = Joi.object({
        merchantName: Joi.string().required(),
        merchantRef: Joi.string().required(),
        amount: Joi.string().required()
    })
    validateRequest(req, next, schema)
}

function initiate(req, res, next) {
    transactionService.initiate(req.body)
        .then((response) => response ? res.status(201).send(response) : res.status(404).send())
        .catch(next)
}

function pay(req, res, next) {
    const return_url = process.env.RETURN_URL
    transactionService.pay(req.params.id)
        .then((response) => response ? res.render('pay', {
            data: response.dataValues,
            transactionService,
            url,
            crypto,
            credential,
            req,
            return_url
        }) : res.status(404).render('404'))
        .catch(next)
}

module.exports = router

