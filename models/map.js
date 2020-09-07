const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    paths: [{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Path'
    }],
    //validate: [(value) => value.length > 0, 'No outputs'],
})

module.exports = mongoose.model('Map', resourceSchema)