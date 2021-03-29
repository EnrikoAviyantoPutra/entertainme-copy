const router = require('express').Router()

const EntertainmeMovies = require('../controllers/EntertainmeMovies')
const MovieController = require('../controllers/MovieController')
const TvSeriesController = require('../controllers/SeriesController')

router.get('/', EntertainmeMovies.find)

router.get('/movies',MovieController.findMovies)
router.post('/movies', MovieController.createMovies)
router.get('/movies/:id', MovieController.findMoviesById)
router.put('/movies/:id', MovieController.updateMovie)
router.delete('/movies/:id', MovieController.deleteMoviesById)

router.get('/tvseries',TvSeriesController.findSeries)
router.post('/tvseries', TvSeriesController.createSerie)
router.get('/tvseries/:id', TvSeriesController.findSerieById)
router.put('/tvseries/:id', TvSeriesController.updateSerie)
router.delete('/tvseries/:id', TvSeriesController.deleteSerieById)

module.exports = router