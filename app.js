const express = require('express')
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({extended :true}))

app.get('/', (req,res) => {
  res.send('Hello World')
})
