const Booking = require('../models/bookingModel')
const Movie = require('../models/movieModel')
const mongoose = require("mongoose")

const getBooking = async (req, res, next) => {
    try{
        const booking = await Booking.findById(req.params.id).populate("user movie")

        if(!booking){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }

        res.status(200).json({booking})

    }
    catch(err){
        return next(err)
    }
}

const addBooking = async (req, res, next) => {
    try{
        const {movie, date, seatNumber} = req.body

        const movieExists = await Movie.findById(movie)
        if(!movieExists){
            return res.status(400).json({message: "Movie doesn't exist"})
        }

        const booking = await Booking.create({
            movie, 
            date: new Date(`${date}`), 
            seatNumber, 
            user: req.user._id 
        })
        if(!booking){
            return res.status(500).json({message: "Unexpected error"})
        }

        const session = await mongoose.startSession()
        const movieData = await Movie.findById(movie)
        const userData = req.user

        session.startTransaction()
        userData.bookings.push(booking)
        movieData.bookings.push(booking)
        await userData.save({session})
        await movieData.save({session})
        await booking.save({session})
        await session.commitTransaction()
        

        

        res.status(201).json({message: "Booking created successfuly", booking})



    }
    catch(err){
        console.log(err)
        next(err)
    }
}

const deleteBooking = async (req, res, next) => {
    try{
        const booking = await Booking.findByIdAndRemove(req.params.id).populate("user movie")

        if(!booking){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }

        const session = await mongoose.startSession()
        session.startTransaction()
        await booking.user.bookings.pull(booking)
        await booking.movie.bookings.pull(booking)
        await booking.user.save({session})
        await booking.movie.save({session})
        await session.commitTransaction()

        res.status(200).json({booking})

    }
    catch(err){
        return next(err)
    }
}

module.exports = {
    getBooking,
    addBooking,
    deleteBooking
}