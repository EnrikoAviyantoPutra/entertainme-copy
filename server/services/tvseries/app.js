const express = require('express')
const { connect } = require('./config/mongodb')

const tvRoute = require('./routes/TvSeries')
const app = express()
const PORT = 4002




app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/tvseries', tvRoute)

connect().then(async () => {
  console.log('Monggo berhasil terhubung')
  app.listen(PORT, () => {
    console.log('Entertainme running on:', PORT)
  
  })
})
 





