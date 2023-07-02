const jwt = require("jsonwebtoken")
const Admin = require("../models/adminModel")
const User = require("../models/userModel")

const protect = async (req, res, next) => {
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

            //get token from headers
            const token = req.headers.authorization.split(' ')[1]
    
            if(!token){
                return res.status(401).json({message: "Not Authorized. No Token Found."})
            }
    
            //verify token to decode it
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
            //from decoded token get admin data except password
            req.admin = await Admin.findById(decoded.id).select('-password')
            req.user = await User.findById(decoded.id).select('-password')

    
            next()
        }
    }
    catch(err){
        console.log(err)
        return res.status(401).json({message: "Not Authorized."})
    }

}

module.exports = {protect}

