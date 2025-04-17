import { asyncHandler } from "../utils/asyncHAndler.js"
import { API_ERROR } from "../utils/apierrorhandler.js"
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, userName, password } = req.body
    console.log("email", email)

    if ([fullName, email, password, userName].some((field) =>
        field?.trim() == "")
    ) {
        throw new API_ERROR(400, "please fill out the forms")
    }

    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })
    if (existedUser) {
        throw API_ERROR(409, "someone exist already")
    }

    const avatarLocalPathreq = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPathreq) {
        throw new API_ERROR(400, "avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPathreq)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new API_ERROR(400, "avatar file is required")
    }

    const user = await User.creat({
        fullName,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        userName: userName.toLowerCase()
    })
    const createdUSer = await user.findById(user._id).select(
        "-password -refreshTOken"
    )
    if (!createdUSer) {
        throw new API_ERROR(500, "something went wrong while registering user")
    }
    return res.status(201).json(
        new apiResponse(200, createdUSer, "user registerd succesfully")
    )
})


export {
    registerUser,
}
