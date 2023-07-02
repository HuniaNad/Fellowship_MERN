const express = require("express")
const router = express.Router()
const movieController = require('../controllers/movieController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', movieController.getAllMovies)
router.get('/:id', movieController.getMovie)
router.post('/add', protect, movieController.addMovie)

module.exports = router