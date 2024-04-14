const path = require('path');
const express = require("express")
const crypto = require('crypto');
const Joi = require('joi');
const { readReceiptsData, writeReceiptsData, sortReceiptsByDate } = require(path.join(__dirname, '../utils/utils.js'));
const router = express.Router()


// add receipt logic

async function saveReceiptData(dtoIn){
    try {
      const json = await readReceiptsData();
      if (!Array.isArray(json)) return {
        "success":false,
        "error":"Couldnt access file receipts.json"
      };
      json.push(dtoIn);
      writeReceiptsData(json)
      .then(result => {
        if (result == true){
          return true
        }else{
          return result
        }
      })
      return true;
    } catch (error) {
      return error
    }
}

const addfuelSchema = Joi.object({
    date: Joi.date().required(),
    fuelAmount: Joi.number().required().positive(),
    price: Joi.number().required().positive(),
    currentMileage: Joi.number().required().positive()
});

router.post("/add", (req,res) => {
    // validace dtoIn
    const { error } = addfuelSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success:false,
        error: error.details[0].message+""
      });
    }
    
    // dtoIn je validní
    dtoIn = req.body
    dtoIn.id = crypto.randomBytes(16).toString("hex")
  
  
    // ulozit recept
    saveReceiptData(dtoIn)
    .then(saveState => {
      if (saveState== true) {
        res.send({"success": true, "receiptId":dtoIn.id});
      } else {
        res.send({"success": false, "error": saveState});
      }
    })
})

// delete specific receipt logic

async function deleteReceiptData(dtoIn){
    try {
      const json = await readReceiptsData();
      if (!Array.isArray(json)) return {
        "success":false,
        "error":"Couldnt access file receipts.json"
      };
  
      let filteredJson = json.filter(element => element.id !== dtoIn.id);
  
      writeReceiptsData(filteredJson)
      .then(result => {
        if (result == true){
          return true
        }else{
          return result
        }
      })
      return true;
    } catch (error) {
      return error
    }
}  

const deletefuelSchema = Joi.object({
    id: Joi.string().required()
});

router.post("/delete", (req,res) =>{
    // validace dtoIn
    const { error } = deletefuelSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    dtoIn = req.body
  
    deleteReceiptData(dtoIn)
    .then(deleteState => {
      if (deleteState == true){
        res.send({"success": true, "receiptId":dtoIn.id});
      }else{
        res.send({"success": false, "error": deleteState});
      }
    })
  })
  

// get info about specific rceipt logic

const infoFuelSchema = Joi.object({
    id: Joi.string().required()
});

router.get("/info", (req, res) => {
    const { error } = infoFuelSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
  
    try{
      readReceiptsData()
      .then(data => {
        let found = data.find(element => element.id === req.body.id)
  
        if (!!found) {
          res.send(found)
        }else{
          res.send({
            "success":false,
            "error":"receipt with id: "+req.body.id+" was not found" 
          })
        }
      })
    }catch(error){
      return {
        "success":false,
        "error":error
      }
    }
})

// Get list of all receipts logic

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function sortReceiptsByMonthAndYear(receipts){
    receipts = sortReceiptsByDate(receipts)
    sortedReceipts = {}

    receipts.forEach(receipt => {
        receiptDate = new Date(receipt.date)
        dateKey = monthNames[receiptDate.getMonth()]+" "+receiptDate.getFullYear()
        if (sortedReceipts[dateKey] == undefined){
        sortedReceipts[dateKey] = [receipt]
        }else{
        sortedReceipts[dateKey].push(receipt)
        }
    })

    return sortedReceipts
}

router.get("/list", (req, res) => {
    try{
      readReceiptsData()
      .then(data => {
        res.send(sortReceiptsByMonthAndYear(data))
      })
    }catch(error){
      return {
        "success":false,
        "error":error
      }
    }
})

module.exports = router