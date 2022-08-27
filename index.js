const mongoose = require("mongoose");
const express = require('express')
const app = express()
require('dotenv').config();
const db =process.env.DB_URI


app.use(express.json())
const port = 3000


mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user',require('./routes/user'))
app.use('/student',require('./routes/student'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



