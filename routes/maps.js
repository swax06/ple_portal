const express = require('express')
const router = express.Router()
const Map = require('../models/map')

// All Maps
router.get('/', async(req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const maps = await Map.find(searchOptions)
        res.render('maps/index', {
            maps: maps,
            searchOptions: req.query
        })
    }
    catch {
        res.redirect('/')
    }
})

// All Maps
router.get('/new', async (req, res) => {
    const map = new Map({
        name: "New_Map"
    })
    try {
        const newMap = map.save()
        console.log(map.id)
        res.redirect('${map.id}/edit')
        //res.redirect('maps/')
    } catch (error) {
        res.render('/')
        // res.render('maps/new', {
        //     resource: resource,
        //     errorMessage: 'Error creating map'
        // })
    }
    // res.render('maps/new', {
    //     map: new Map({})
    // })
})

router.get('/:id/path', async (req, res) => {
    try {
        const maps = await Map.findById(req.param.id)
        res.render('maps/path', {maps: maps})
    }
    catch {
        res.redirect('/')
    }
})

// create new map
router.post('/', async (req, res) => {
    const map = new Map({
        name: req.body.name
    })
    try {
        const newMap = await map.save()
        res.redirect('maps/${newMap.id}')
        //res.redirect('maps/')
    } catch (error) {
        res.render('maps/new', {
            resource: resource,
            errorMessage: 'Error creating map'
        })
    }
})

router.get('/:id', (req, res) => {
    res.send('Show Map' + req.param.id)
})

// router.get('/:id/edit', async (req, res) => {
//     try {
//         const maps = await Map.findById(req.param.id)
//         res.render('maps/edit', {maps: maps})
//     }
//     catch {
//         res.redirect('/')
//     }
// })

router.get('/:id/edit', async (req, res) => {
    try {
      const map = await Map.findById(req.params.id)
      res.render('maps/edit', { map: map })
    } catch {
      res.redirect('/maps')
    }
})
  
router.put('/:id', async (req, res) => {
    let map
    try {
        map = await Map.findById(req.params.id)
        map.name = req.body.name
        await map.save()
        res.redirect(`/maps/${map.id}`)
    } catch {
        if (map == null) {
        res.redirect('/')
        } else {
        res.render('maps/edit', {
            map: map,
            errorMessage: 'Error updating Map'
        })
        }
    }
})

router.delete('/:id', (req, res) => {
    res.send('Delete Map' + req.param.id)
})



module.exports = router