import express from 'express'
import bodyParser from 'body-parser'

const app  = express(),
      port = process.env.PORT || 3000

app.listen(port)
console.log('API server started on: ' + port)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

module.exports = app
