import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt"



const userSchema = new Schema(
    {
        userName:{
            type:"string",
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:"string",
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
         fullName:{
            type:"string",
            required:true,
            lowercase:true,
            trim:true,
        },
        avatar:{
            type:"string", // cloudinary url,
        },
        coverImage:{
            type:"string", // cloudinary url,
        },
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"video"
        },
        password:{
            type:"string",
            required:[true, "password is required"]
        },
        refreshTOken:{
            type:"string"
        }
    },
    {
        timeStamps:true
    }
    
)


userSchema.pre("save", async function  (next)  {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
}
    
)

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}
userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id : this.id,
            _userName:this.name,
            _email:this.email,
            _fullName:this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id : this.id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model("User" , userSchema)