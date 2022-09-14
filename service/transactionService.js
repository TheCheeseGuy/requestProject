require('dotenv').config()
const config = require('../config.json')
const { createHmac } = require('crypto')
const db = require('../helpers/db')
const axios = require('axios')

module.exports = {
    sign,
    initiate,
    pay,
    returnCall,
    statusCheck,
}

async function statusCheck(id) {
    try {
        const transaction = await db.Transaction.findOne({
            where: {
                merchantRef: id
            }
        })
        if (!transaction) return "No transaction found"
        return basicDetails(transaction)
    } catch (error) {
        return error
    }
}

async function returnCall(params) {
    try {
        const { decision, auth_trans_ref_no, signature, message, transaction_id, card_type_name, req_card_number } = params

        const transaction = await db.Transaction.findOne({
            where: {
                refNo: auth_trans_ref_no
            }
        })
        if (!transaction || signature !== sign(params)) console.log("No valid transaction found")
        switch (decision) {
            case "ACCEPT":
                transaction.status = "accept"
                transaction.rawResponse = params
                transaction.message = message
                transaction.cardType = card_type_name
                transaction.cardNo = req_card_number
                transaction.transactionID = transaction_id
                transaction.doneAt = Date.now()
                await transaction.save()
                await postToMerchant(transaction, "Y")
                return "success"
            case "ERROR": case "DECLINE": case "REVIEW": case "CANCEL":
                transaction.status = "decline"
                transaction.rawResponse = params
                transaction.message = message
                transaction.doneAt = Date.now()
                await transaction.save()
                await postToMerchant(transaction, "N")
                return "failed"
            default:
                transaction.rawResponse = params
                transaction.message = message
                transaction.doneAt = Date.now()
                await transaction.save()
                await postToMerchant(transaction, 'N')
                break;
        }

    } catch (error) {
        return error
    }
}

async function initiate(params) {
    try {
        const transaction = new db.Transaction(params)
        transaction.refNo = `EC${Date.now()}`
        transaction.status = "initiated"
        transaction.expires = new Date(Date.now() + 15 * 60 * 1000)
        await transaction.save()
        return transaction
    } catch (error) {
        return error
    }
}

async function pay(id) {
    try {
        const transaction = await db.Transaction.findOne({
            where: {
                refNo: id,
                status: "initiated"
            }
        })
        if (!transaction || !transaction.isActive) throw "No valid transaction"
        return transaction
    } catch (error) {
        console.log(error)
    }
}

function sign(params) {
    try {
        return signData(buildDataToSign(params), process.env.SECRET_KEY)
    } catch (error) {
        console.log(error)
    }
}

function signData(data, secretKey) {
    try {
        const hmac = createHmac("sha256", secretKey)
        hmac.update(data)
        return hmac.digest('base64')
    } catch (error) {
        console.log(error)
    }
}

function buildDataToSign(params) {
    try {
        const { signed_field_names } = params
        var signedFieldNames = signed_field_names.split(',')
        let dataToSign = []
        signedFieldNames.forEach(field => {
            dataToSign.push(field + '=' + params[field])
        })
        return dataToSign.join(',')
    } catch (error) {
        console.log(error)
    }
}

function basicDetails(data) {
    const { id, merchantName, merchantRef, refNo, transactionID, amount, message, status, updatedAt } = data
    return { id, merchantName, merchantRef, refNo, transactionID, amount, message, status, updatedAt }
}

async function postToMerchant(transaction, result) {
    try {
        const { merchantRef, amount } = transaction
        var data = JSON.stringify({
            'invoiceNo': merchantRef,
            'result': result,
            'sellingamount': amount
        })
        var config = {
            method: 'post',
            url: process.env.MERCHANT_RETURN_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        axios(config).then((response) => {
            return response
        }).catch((error) => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}