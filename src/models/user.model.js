import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, // cloudianry url
        required:true
    },
    coverImage:{
        type:String, // cloudinary url
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    }
}, { timestamps:true })

// mongoose hook , don't use arrow function as it does not have this reference
userSchema.pre("save", async function(next) {
    // first check if the password is changed and then only make the changes
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// Access token generation
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id:this._id, // from mongo
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Refresh token generation
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id:this.id // only pass id in refresh token
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)