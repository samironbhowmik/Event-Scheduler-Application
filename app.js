const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./connect/connectDB")
const route = require("./route/route")

const app = express()
dotenv.config()
app.use(express.json())

app.use("/", route)


app.listen(process.env.PORT, async(req,res)=>{
    connectDB()
    console.log(`App is connected at port ${process.env.PORT}`);
})