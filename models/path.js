const mongoose = require('mongoose')
const Resource = require('resource')

const pathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    elements: [{
        sno: {type: int},
        resource: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Resource'
        },
        coordinates: {
            type: [Number, Number],
            index: '2d',
            required: true
        }
    }]
})

module.exports = mongoose.model('Path', pathSchema)