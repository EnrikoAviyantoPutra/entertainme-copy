const express = require('express')
const entertainmeRoute = require('./routes/EntertainmeRoute')
// const tvRoute = require('./routes/TvSeries')
const app = express()
const PORT = 4000




app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/entertainme', entertainmeRoute)
// app.use('/entertainme-tvseries', tvRoute)

  app.listen(PORT, () => {
    console.log('Entertainme running on:', PORT)
  
  })

 





