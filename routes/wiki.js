const express = require('express')
const wikiRouter = express.Router()

wikiRouter.get('/', (req,res,next) => {
  res.send('Landed on GET route for all wiki pages')
})

wikiRouter.post('/',(req,res,next) => {
  res.send('You hit the POST route for /wiki')
})

wikiRouter.get('/add', (req,res,next) => {
  res.send(`You've hit the route to retrieve the 'Add a Page' form` )
})

module.exports = wikiRouter
