const express = require('express')
const app = express();
const morgan = require('morgan')
const layout = require('./views/layout')
const { db } = require('./models');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send(layout(''))
})




const PORT = 8080;

const init = async () => {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`The app is listening to your every command on ${PORT}`)
  })
}

init()

db.authenticate().
  then(() => {
    console.log('Connected to the DB!!')
  })
