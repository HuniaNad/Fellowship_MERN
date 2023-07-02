const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers)
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/bookings/:id', userController.getBookingsOfUser)


module.exports = router