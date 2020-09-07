if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// Routes 
const indexRouter = require('./routes/index')
const mapRouter = require('./routes/maps')
const resourceRouter = require('./routes/resources')

// Database Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.set(express.static('public'))

app.use(methodOverride('_method'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use('/', indexRouter)
app.use('/maps', mapRouter)
app.use('/resources', resourceRouter)


app.listen(process.env.PORT || 3000)
