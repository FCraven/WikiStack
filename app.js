const express = require('express')
const app = express();
const morgan = require('morgan')
const layout = require('./views/layout')

app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
  res.send(layout(''))
})


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`The app is listening to your every command on ${PORT}`)
})
