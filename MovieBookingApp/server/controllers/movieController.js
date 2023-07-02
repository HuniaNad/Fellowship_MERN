const Movie = require('../models/movieModel')
const Admin = require('../models/adminModel')
const mongoose = require("mongoose")

const getAllMovies = async (req, res, next) => {
    try{
        const movies = await Movie.find({})

        if(!movies){
            return res.status(500).json({message: "Unexpected error"})
        }

        res.status(201).json({movies})
    }
    catch(err){
        console.log(err.message)
        return next(err)
    }
}

const getMovie = async (req, res, next) => {
    try{
        const movie = await Movie.findById(req.params.id)

        if(!movie){
            return res.status(500).json({message: "Unexpected error"})
        }

        res.status(201).json({movie})
    }
    catch(err){
        console.log(err.message)
        return next(err)
    }
}

const addMovie = async (req, res, next) => {
    try{
        const {title, description, actors, releaseDate, posterUrl, featured} = req.body

        if(!title || !description || !releaseDate || !posterUrl){
            return res.status(400).json({message: "Invalid Inputs"})
        }

        const newMovie = await Movie.create({
            title, 
            description, 
            actors,
            releaseDate: new Date(`${releaseDate}`), 
            posterUrl, 
            featured,
            admin: req.admin._id
        })
        const session = await mongoose.startSession()
        const adminData = req.admin
        session.startTransaction()
        await newMovie.save({session})
        adminData.addedMovies.push(newMovie)
        await adminData.save({session})
        await session.commitTransaction()

        if(!newMovie){
            return res.status(500).json({message: "Unexpected error"})
        }

        res.status(201).json({message: "Movie added successfuly", newMovie})
    }
    catch(err){
        console.log(err.message)
        return next(err)
    }
}

module.exports = {
    getAllMovies,
    getMovie,
    addMovie,
    
}