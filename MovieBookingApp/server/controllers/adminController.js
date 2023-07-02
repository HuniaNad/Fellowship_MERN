const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const genHashPassword = require('../services/generateHashPassword')
const genToken = require('../services/generateToken')

const getAdmins = async (req, res, next) => {
    try{
        const admins = await Admin.find({})

        if(!admins){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }

        res.status(200).json({admins})

    }
    catch(err){
        return next(err)
    }
}


const signup = async (req, res, next) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "Invalid Inputs"})
        }

        const existAdmin = await Admin.findOne({email})
        if(existAdmin){
            return res.status(400).json({message: "Admin already exists"})
        }

        const hashedPassword = await genHashPassword(password)
        const admin = await Admin.create({email, password: hashedPassword})
        admin.save()

        if(!admin){
            return res.status(500).json({message: "Unexpected error"})
        }

        res.status(201).json({message: "Admin added successfuly", admin})
    }
    catch(err){
        return next(err)
    }
}

const login = async (req, res, next) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "Invalid Inputs"})
        }

        const admin = await Admin.findOne({email})
        if(admin && (await bcrypt.compare(password, admin.password))){
            return res.status(200).json({
                message: "Login successful",
                id: admin._id,
                email: admin.email,
                token: genToken(admin._id)
            })
        }
        else{
            return res.status(500).json({message: "Unexpected error"})
        }
    }
    catch(err){
        return next(err)
    }
}

module.exports = {
    getAdmins,
    signup,
    login
}