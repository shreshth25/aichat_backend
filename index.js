require('dotenv').config()

const express = require('express')
const chatRouter = require('./routes/chat')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/chat", chatRouter)

app.listen(PORT, ()=>{
    console.log(`Server Listening at port ${PORT}`)
})