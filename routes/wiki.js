const express = require('express')
const wikiRouter = express.Router()
const addPage = require('../views/addPage')
const { Page, User } = require("../models")
const wikipage = require('../views/wikipage')
const main = require('../views/main')



wikiRouter.get('/', async (req,res,next) => {
  const pages = await Page.findAll();
  res.send(main(pages))
})


wikiRouter.post('/', async (req,res,next) => {
  const page = await Page.create(req.body)
  const [user, wasCreated] = await User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })

  page.setAuthor(user)

  try{
    await page.save();
    console.log(page)
    res.redirect(`/wiki/${page.slug}`)
  } catch (error) {
    next(error)
  }
})

wikiRouter.get('/add', (req,res,next) => {
  res.send(addPage())
})

wikiRouter.get('/:slug', async (req,res,next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })

    if(!page){
      res.status(404).send('That page no live here no more. GO AWAY!!')
    } else {
      const author = await page.getAuthor()
      res.send(wikipage(page,author))
    }
  } catch (error) {
    next(error)
  }
})

module.exports = wikiRouter
