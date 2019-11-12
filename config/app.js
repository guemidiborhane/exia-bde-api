import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'

const app  = express(),
      port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('API server started on: ' + port)
})

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

export default app
