const mongoose = require("mongoose");
const { Schema } = mongoose;
/**
 * Model to be used as the schema for Queue of a specific station
 * 
 */
const QueueSchema = new Schema({

    stationId:{type: String,required: true},
    vehicleId: {type: String,required: true},
    vehicleType: {type: String,required: true},
    joined :{type: String,required: true},
    exit :{type: String },
    status:{type:String}
});



const Queue = mongoose.model("queue", QueueSchema);

module.exports = Queue;