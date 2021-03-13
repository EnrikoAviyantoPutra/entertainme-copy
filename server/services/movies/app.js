const express = require('express')
const { connect } = require('./config/mongodb')
const movieRoute = require('./routes/Movie')
const app = express()
const PORT = 4001




app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/movies', movieRoute)


connect().then(async () => {
  console.log('Monggo berhasil terhubung')
  app.listen(PORT, () => {
    console.log('Entertainme running on:', PORT)
  
  })
})
 





