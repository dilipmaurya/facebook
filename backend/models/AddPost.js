const Sequelize = require('sequelize');

const sequelize = require('../util/database')


const AddPost = sequelize.define('posts', {
  
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(2000),
    allowNull: false
    
  }

  }
);





module.exports = AddPost