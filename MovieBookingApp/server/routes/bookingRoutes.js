const express = require("express")
const router = express.Router()
const bookingController = require('../controllers/bookingController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:id', bookingController.getBooking)
router.post('/add', protect, bookingController.addBooking)
router.delete('/:id', protect, bookingController.deleteBooking)

module.exports = router