import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/APiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
// handler function
// method to register user
const registerUser = asyncHandler(async (req,res) => {
  // get user details from Front-End
  // validation - not empty
  // check if user already exits
  // check for images, check for avatar
  // upload them to cloudinary, special check for avatar
  // create user object - creation entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  // get user details from front-end
  const {fullName,email,username,password} = req.body
  console.log("email: ",email)

  // field validation
  if(
    [fullName,email,username,password].some((field) => 
    field?.trim() === "")
  ){
    throw new ApiError(400,"All fields are required")
  }

//   if(fullName === ""){
//     throw new ApiError(400,"fullname is required")
//   }

// if user already exists
  const existedUser = User.findOne({
    $or: [{username},{email}]
  })
  if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
  }

  // image check
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPAth = req.files?.coverImage[0]?.path

  // special check for avatar file
  if(!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required")
  }

 const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPAth)

 if(!avatar) {
    throw new ApiError(400,"Avatar file is required")
 }

 //database insertion
 // Since db is in another continent, it will take time to upload data
 const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage.url || "", // check if coverimage is present or not
    email,
    password,
    username:username.toLowerCase()
 })
const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,'Something went wrong while registering the user ')
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully!")
)
})

export {registerUser}