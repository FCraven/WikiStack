const express = require('express')
const wikiRouter = express.Router()
const addPage = require('../views/addPage')
const { Page, User } = require("../models")
const wikipage = require('../views/wikipage')
const main = require('../views/main')
const editPage = require('../views/editPage')



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
      res.status(404)
          .redirect('/wiki')
    } else {
      const author = await page.getAuthor()
      res.send(wikipage(page,author))
    }
  } catch (error) {
    next(error)
  }
})

wikiRouter.get('/:slug/edit', async (req,res,next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    if(!page){
      res.status(404)
          .redirect(`/wiki/${req.params.slug}`)
    } else {
      const author = await page.getAuthor()
      res.send(editPage(page, author))
    }
  } catch (error) {
      next(error)
    }
})

wikiRouter.post('/:slug', async (req,res,next) => {
  try {
    console.log(req.body)
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if(!page) {
      res.status(404).redirect(`/wiki/${req.params.slug}`)
    } else {
        await page.update({
          name: req.body.name,
          email: req.body.email,
          title: req.body.title,
          content: req.body.content,
          status: req.body.status
        })
      res.redirect(`/wiki/${req.params.slug}`)
    }
  } catch (error) {
      next(error)
    }
  })

wikiRouter.get('/:slug/delete', async (req,res,next) => {
  try{
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    })
    res.redirect('/wiki')
  } catch (error) {
      next (error)
  }
})



module.exports = wikiRouter
