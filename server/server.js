const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const receiptRouter = require(path.join(__dirname, 'routes/receipts'))
const dashboardRouter = require(path.join(__dirname, 'routes/dashboard'))

app.use(express.json());
app.use("/receipts",receiptRouter)
app.use("/dashboard",dashboardRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})