const router = require('express').Router()

const EntertainmeMovies = require('../controllers/EntertainmeMovies')


router.get('/', EntertainmeMovies.find)
router.get('/movies',EntertainmeMovies.findMovies)
router.post('/movies', EntertainmeMovies.createMovies)
router.get('/movies/:id', EntertainmeMovies.findMoviesById)
router.put('/movies/:id', EntertainmeMovies.updateMovie)
router.delete('/movies/:id', EntertainmeMovies.deleteMoviesById)


module.exports = router