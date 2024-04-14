const express = require("express")
const router = express.Router()
const path = require('path');
const Joi = require('joi');

const {readReceiptsData, writeReceiptsData, sortReceiptsByDate } = require(path.join(__dirname, '../utils/utils.js'));


// get statistics for current map logic
async function getSummaryForMonth(monthNumber,Year){
    return readReceiptsData()
    .then(receipts => {
      currentMonthReceipts = receipts.filter(receipt => new Date(receipt.date).getMonth() == monthNumber && new Date(receipt.date).getFullYear() == Year)
  
      if (currentMonthReceipts.length > 0) {
  
        sortReceiptsByDate(currentMonthReceipts)
  
        mileage = 0
        if (currentMonthReceipts.length > 1) {
          mileage = (currentMonthReceipts[0].currentMileage - currentMonthReceipts[currentMonthReceipts.length-1].currentMileage)
        }else{
          mileage = currentMonthReceipts[0].currentMileage
        }
  
        currency = 0
        gallons = 0
        currentMonthReceipts.forEach(receipt => {
          currency += receipt.price,
          gallons += receipt.fuelAmount
        });
  
        consumption = (gallons/mileage)*100
        return ([
          currency.toFixed(2),
          consumption.toFixed(1),
          mileage.toFixed()
        ])
      }else{
        return ([0,0,0])
      }
    })
}
  
const getDashboardSchema = Joi.object({
  currencyMax: Joi.number().required().positive(),
  consumptionMax: Joi.number().required().positive(),
  mileageMax: Joi.number().required().positive()
});


router.get('/get', (req, res) => {
     // validace dtoIn
     const { error } = getDashboardSchema.validate(req.body);
     if (error) {
       return res.status(400).json(error.details[0].message);
     }

    try {
      getSummaryForMonth(new Date().getMonth(), new Date().getFullYear())
      .then(summary => {
        [currency,consumption,mileage] = summary
      
        res.send({
          "currency":{
            "current":currency,
            "percentage": ((currency/req.body.currencyMax)*100).toFixed()
          },
          "consumption":{
            "current":consumption,
            "percentage":((consumption/req.body.consumptionMax)*100).toFixed()
          },
          "mileage":{
            "current":mileage,
            "percentage":((mileage/req.body.mileageMax)*100).toFixed()
          }
        })
      })
    }catch (error){
      res.send({
        "success":false,
        "error":error
      })
    }
  })

module.exports = router