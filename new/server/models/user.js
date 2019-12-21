const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    birthDate:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    description:{
        type:String,
        default:'null'
    }
})

module.exports=mongoose.model('User',userSchema);