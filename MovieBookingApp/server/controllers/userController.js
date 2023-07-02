const User = require('../models/userModel')
const Booking = require('../models/bookingModel')
const bcrypt = require('bcryptjs')
const genHashPassword = require('../services/generateHashPassword')
const generateToken = require('../services/generateToken')

const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({})

        if(!users){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }

        res.status(200).json({users})

    }
    catch(err){
        return next(err)
    }
}

const signup = async (req, res, next) => {
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: "Invalid Inputs"})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await genHashPassword(password)
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })

        if(!user){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }

        res.status(201).json({user})
        user.save()

    }
    catch(err){
        return next(err)
    }
}

const login = async (req, res, next) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(404).json({message: "Invalid credentials"})
        }

        const user = await User.findOne({email})
        console.log(user)

        if(user && (await bcrypt.compare(password, user.password))){
            return res.status(200).json({
                message: "Login successful",
                id: user._id,
                email: user.email,
                token: generateToken(user._id)})
        }else{
            return res.status(404).json({message: "User Not Found"})
        }

    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const updateUser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "Invalid Inputs"})
        }

        const userExists = await User.findOne({email})
        console.log(userExists)
        if(userExists){
            return res.status(400).json({message: "Email already exists"})
        }

        const hashedPassword = await genHashPassword(password)
        console.log(hashedPassword)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {name, email, password: hashedPassword})
        console.log(updatedUser)

        res.status(200).json({message: "Updated Successfully", updatedUser})

    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const deletedData = await User.findByIdAndRemove(req.params.id)

        if(!deletedData){
            return res.status(404).json({message: "User not found"})
        }

        console.log(deletedData)

        res.status(200).json({message: "Deleted Successfully", updatedData: deletedData})

    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getBookingsOfUser = async (req, res, next) => {
    try{
        const bookings = await Booking.find({ user: req.params.id})
        if(!bookings){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }

        res.status(200).json({bookings})

    }catch(err){
        return next(err)
    }
}

module.exports = {
    getAllUsers,
    signup,
    updateUser,
    deleteUser,
    login,
    getBookingsOfUser
}