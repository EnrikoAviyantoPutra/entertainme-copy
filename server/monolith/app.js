const express = require('express')
const { connect } = require('./config/mongodb')
const movieRoute = require('./routes/Movie')
const tvRoute = require('./routes/TvSeries')
const app = express()
const PORT = 3000




app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/movies', movieRoute)
app.use('/tvseries', tvRoute)

connect().then(async () => {
  console.log('Monggo berhasil terhubung')
  app.listen(PORT, () => {
    console.log('Entertainme running on:', PORT)
  
  })
})
 





