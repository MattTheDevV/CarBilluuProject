const path = require('path');
const fs = require("fs").promises
const filePath = path.join(__dirname, '../receipts.json');

function sortReceiptsByDate(receipts){
    return receipts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
    });
}

async function readReceiptsData(){
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const json = JSON.parse(data);
      return json
    }catch (error){
      return error
    }
}
  
async function writeReceiptsData(json){
  try{
  fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8');
  return true
  }catch (error){
      return error
  }
}

module.exports = { readReceiptsData, writeReceiptsData, sortReceiptsByDate };