const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    location:{type:String, required:true},
    startTime:{type:String, required:true},
    endTime:{type:String, required:true}
})

const eventModel = mongoose.model("eventModel", eventSchema)
module.exports = eventModel;