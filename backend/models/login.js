
const Sequelize = require('sequelize');

const sequelize = require('../util/database')


const Login = sequelize.define('login', {
  
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    
  }
  }
);





module.exports = Login