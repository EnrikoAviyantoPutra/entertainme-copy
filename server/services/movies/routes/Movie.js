const router = require('express').Router()

const MovieController = require('../controllers/MovieController')


router.get('/', MovieController.find)
router.post('/', MovieController.create)
router.get('/:id', MovieController.findId)
router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.deleteId)


module.exports = router