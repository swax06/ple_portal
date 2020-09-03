const express = require('express')
const router = express.Router()

// All Maps
router.get('/', (req, res) => {
    res.render('maps/index')
})

// All Maps
router.get('/new', (req, res) => {
    res.render('maps/new')
})

// create new map
router.post('/', (req, res) => {
    res.send('create')
})

module.exports = router