const express = require('express')
const userRouter = express.Router()
const { User, Page } = require('../models')
const userList = require('../views/userList')
const userPages= require('../views/userPages')

userRouter.get('/', async (req,res,next) => {
  try{
    const users = await User.findAll();
    res.send(userList(users))
  } catch (error) {
    next(error);
  }
})

userRouter.get('/:id', async (req,res,next) => {
  try{
    const id = req.params.id;
    const user = await User.findById(id)
    const pages = await Page.findAll({
      where: {
        authorId: id
      }
    })

    res.send(userPages(user,pages))

  } catch(error) {
    next(error);
  }
})

module.exports = userRouter
