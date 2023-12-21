const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const details=mongoose.model('user',UserSchema);

module.exports=details;