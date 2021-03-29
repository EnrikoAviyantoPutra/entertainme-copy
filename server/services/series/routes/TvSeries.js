const router = require('express').Router()
const TvSeriesController = require('../controllers/TvSeriesController')


router.get('/',TvSeriesController.find)
router.post('/', TvSeriesController.create)
router.get('/:id', TvSeriesController.findId)
router.put('/:id', TvSeriesController.update)
router.delete('/:id', TvSeriesController.deleteId)


module.exports = router