const express = require("express")
const app = express()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

mongoose
    .connect(db, { useNewUrlParser: true})
    .then( () =>  console.log(`Connected to MongoDB successfully`))
    .catch( err => console.log(err))

app.get("/", (req, res) => res.send("Hello again..."))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Service is running on port ${port}`))
