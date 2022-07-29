const express = require('express')
const mongoose = require('mongoose')
const shortlink = require('./model/shortlink')
const app = express()

mongoose.connect('mongodb://127.0.0.1/urlshorten', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
 const shortlinks= await shortlink.find()
 res.render('index', {shortlinks: shortlinks})

}) 

app.post('/shortlink', async (req, res) => {
 await shortlink.create({ full: req.body.fullurl})
})

app.get('./:shortlink', async (req, res) => {
 const shortlink= await shortlink.findOne({ short: req.param.shortlink})
 
 if (shortlink == null) return res.sendStatus(404)
 
 shortlink.clicks++
 
 shortlink.save()
 res.redirect(shortlink.full) 
})

app.listen(process.env.PORT || 5000);