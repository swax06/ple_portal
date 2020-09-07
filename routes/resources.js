const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')

// All Resources
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const resources = await Resource.find(searchOptions)
        res.render('resources/index', {
            resources: resources,
            searchOptions: req.query
        })
    }
    catch {
        res.redirect('/')
    }
})

// My Resources
router.get('/user_resource', (req, res) => {
    res.render('resources/user_res')
})

// Add new resource
router.get('/new', (req, res) => {
    res.render('resources/new', {
        resource: new Resource()
    })
})

router.post('/', async (req, res) => {
    const resource = new Resource({
        name: req.body.name
    })
    try {
        const newResource = await resource.save()
        //res.redirect('resource/${newResource.id}')
        res.redirect('resources/')
    } catch (error) {
        res.render('resources/new', {
            resource: resource,
            errorMessage: 'Error creating resource'
        })
    }
})

module.exports = router