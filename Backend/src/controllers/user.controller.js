import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
       return res.status(404).json({
            success: false,
            message: "Please enter All the fields"
        })
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
       return res.status(400).json({
            success: false,
            message: "User already exists with this email"
        })
    }
    const securePassword = await bcrypt.hash(password, 10)

    const avatarLocalPath = req.file ? req.file.path : null;
    if (!avatarLocalPath) {
       return res.status(404).json({
            success: false,
            message: "No avatar local path found"
        })
    }
    const file = await uploadOnCloudinary(avatarLocalPath)
    if (!file) {
       return res.status(500).json({
            success: false,
            message: "Something went wrong uploading avatar"
        })
    }
    const user = await User.create({
        name,
        email,
        password: securePassword,
        address,
        avatar: file?.url


    })

    res.status(200).json({
        success: true,
        user
    })
})


const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    let user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({
            success: false,
            message: "Please enter correct email "
        })


    }
    const comparingPassword = await bcrypt.compare(password, user.password)
    if (!comparingPassword) {
        res.status(400).json({
            message: "Please enter correct password",
            success: false
        })
    }

    const tokenData = { userId: user._id }
    const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {

        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })

    user = {
        name: user.name,
        email: user.email,
        address: user.address,
        avatar: user.avatar,
        role:user.role
    }
    const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,

    }

    res.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        message: `Welcome back ${user.name}`,
        user,
        token

    })

})

const Logout = asyncHandler(async (req, res) => {

    const name = req.user?.name

    res.status(200)
        .clearCookie("token", "")
        .json({
            message: `See you soon ${name}`,
            success: true
        });

})


const updateProfile = asyncHandler(async (req, res) => {
    const source = req.body;
    const userId = req.user._id;
    if (!userId) {
        res.status(404).json({
            success: false,
            message: "Please Login First"
        })
    }

    let user = await User.findById(userId)
    if (!user) {
        res.status(404).json({ success: false, message: "no user found" });

    }

    if (source.name) user.name = source.name;
    if (source.email) user.email = source.email;
    if (source.address) user.address = source.address;
    if (source.password) {
        user.password = await bcrypt.hash(source.password, 10)
    }

    if (req.file) {
        const avatarlocalPath = req.file.path
        const avatar = await uploadOnCloudinary(avatarlocalPath)
        user.avatar = avatar.url

    }

    await user.save();
    res.status(200).json({
        success: true,
        message:"user updated successfully",
        user
    })

})
export {
    registerUser,
    Login,
    Logout,
    updateProfile
}