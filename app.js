const express = require("express")
const app = express()

app.get("/", (req, res) => res.send("Hello again..."))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Service is running on port ${port}`))
