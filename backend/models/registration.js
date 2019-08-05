
const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const RegistrationNow = sequelize.define('registration', {

	firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  phonenumber: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  
  otp:{
    type:Sequelize.STRING,
    allowNull: false
  },

  Status:{
    type:Sequelize.BOOLEAN,
    values:false
  },

  Token:{
    type: Sequelize.STRING
  },
  TokenExp:{
    type:Sequelize.STRING
  }

})


module.exports = RegistrationNow;