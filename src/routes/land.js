const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/land')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', ctrl.createRecord)
router.put('/:id', ctrl.changeRecord)
router.delete('/:id', ctrl.deleteRecord)

module.exports = router
