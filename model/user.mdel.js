//schema is created here

const mongoose  = require('mongoose');
const Schema   =  mongoose.Schema;

//name email  mobile password
let userSchema = new Schema({
    name : {
        type :  String
    },
    email : {
        type :  String
    },
    mobile : {
        type : Number
    },
    password : {
        type :  String
    },
    profilePic : {
        // data: Buffer,
        type :  String
    }


},
{

    collection : 'users'
}
);

module.exports = mongoose.model('userSchema' , userSchema)