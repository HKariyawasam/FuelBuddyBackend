const mongoose = require("mongoose");
const { Schema } = mongoose;
/**
 * Model to be used as the schema for Station
 * 
 */
const StationSchema = new Schema({

    id:{type: String,required: true},
    name: {type: String,required: true},
    address :{type: String,required: true},
    phone :{type: String,required: true},
    email :{type: String,required: true,},

    fuel :[
        {
            type:{type:String, required:true},
            arrival:{},
            complete:{},
            status:{type:String, required:true}
        }
    ],
});



const Station = mongoose.model("station", StationSchema);

module.exports = Station;