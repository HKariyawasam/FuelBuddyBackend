const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Model to be used as the schema for users 
 * 
 */

const UserSchema = new Schema({
    name: {type: String,required: true},
    phone: {type: String,required: true, maxLength:10},
    email: {type: String,required: true},
    password: {type: String,required: true},
    type: {type: String,required: true},
    station:{},
    vehicleType:{type:String},
    vehicleId:{type:String}
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User = mongoose.model("user", UserSchema);

module.exports = User;