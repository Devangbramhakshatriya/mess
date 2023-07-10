const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    mobileNumber:Number,
    password:String,
    diposite:Number,
    dipositeStatus:String
})

const UserModel=mongoose.model('user',userSchema)

module.exports=UserModel;