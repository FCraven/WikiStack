const express = require('express')
const userRouter = express.Router()
const { User } = require('../models')
const userList = require('../views/userList')

userRouter.get('/', async (req,res,next) => {
  try{
    const users = await User.findAll();
    res.send(userList(users))
  } catch (error) {
    next(error);
  }
})

module.exports = userRouter
