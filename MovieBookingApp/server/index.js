const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require('./config/db')

const app = express()
const port = process.env.PORT || 5000
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));

app.use('/user', require('./routes/userRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/movie', require('./routes/movieRoutes'))
app.use('/booking', require('./routes/bookingRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))