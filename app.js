const express = require('express')
const app = express();
const morgan = require('morgan')
const layout = require('./views/layout')
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
  res.send(layout(''))
})




const PORT = 8080;

const init = async () => {
  await db.sync({force:true});
  app.listen(PORT, () => {
    console.log(`The app is listening to your every command on ${PORT}`)
  })
}

init()

db.authenticate().
then(() => {
  console.log('Connected to the DB!!')
})
