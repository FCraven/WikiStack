const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});
const {slugMaker} = require('../utils')


//models
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull:false
  },
  status: {
    type: Sequelize.ENUM('open','closed')
  },
}, {
  hooks: {
    beforeValidate: function(page){
      page.slug = slugMaker(page.title)
    }
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email:{
    type:Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

//Associations

//Hooks


module.exports = { db, Page, User }
