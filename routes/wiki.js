const express = require('express')
const wikiRouter = express.Router()
const addPage = require('../views/addPage')
const { Page } = require("../models")
const wikipage = require('../views/wikipage')
const main = require('../views/main')


wikiRouter.get('/', async (req,res,next) => {
  const pages = await Page.findAll();
  res.send(main(pages))
})


wikiRouter.post('/', async (req,res,next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

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
    res.send(wikipage(page))
  } catch (error) {
    next(error)
  }
})

module.exports = wikiRouter
