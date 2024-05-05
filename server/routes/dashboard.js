const express = require("express")
const router = express.Router()
const path = require('path');
const Joi = require('joi');

const {readReceiptsData, writeReceiptsData, sortReceiptsByDate } = require(path.join(__dirname, '../utils/utils.js'));


// get statistics for current map logic
async function getSummaryForMonth(monthNumber, year) {
  return readReceiptsData()
  .then(receipts => {
      const currentMonthReceipts = receipts.filter(receipt => {
          const [yearPart,month, day] = receipt.date.split('-');
          const date = new Date(`${yearPart}-${month}-${day}`); // Convert to a proper format
          return date.getMonth() === monthNumber && date.getFullYear() === year; // Adjust monthNumber since getMonth() returns 0-11
      });

      if (currentMonthReceipts.length > 0) {
          sortReceiptsByDate(currentMonthReceipts); // Ensure this function modifies the array directly or returns a sorted array

          let mileage = 0;
          if (currentMonthReceipts.length > 1) {
              // Sort might be ascending or descending; ensure 0 is the latest after sort
              mileage = Math.abs(currentMonthReceipts[0].currentMileage - currentMonthReceipts[currentMonthReceipts.length - 1].currentMileage);
          } else {
              mileage = currentMonthReceipts[0].currentMileage;
          }

          let currency = 0;
          let gallons = 0;
          currentMonthReceipts.forEach(receipt => {
              currency += receipt.price;
              gallons += receipt.fuelAmount;
          });

          const consumption = gallons > 0 ? (gallons / mileage) * 100 : 0; // Prevent division by zero

          return [
              currency.toFixed(2),
              consumption.toFixed(1),
              mileage.toFixed()
          ];
      } else {
          return [0, 0, 0];
      }
  });
}

  
const getDashboardSchema = Joi.object({
  currencyMax: Joi.number().required().positive(),
  consumptionMax: Joi.number().required().positive(),
  mileageMax: Joi.number().required().positive()
});


router.post('/get', (req, res) => {
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