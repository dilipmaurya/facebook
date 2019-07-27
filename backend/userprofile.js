
const express = require('express')
const Sequelize = require('sequelize');

var app = express();


//=============================>databse ====>username

const sequelize = new Sequelize('postgres', 'postgres', 'test123', {
  host: 'localhost',
  dialect:'postgres'
});


//checking the connection is Ok or not


sequelize
  .authenticate()
  .then(() => {
    console.log('successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  //Modeling the Table

const User = sequelize.define('userprofile', {
  // attributes
  userid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
   phonenumber: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
   address: {
    type: Sequelize.STRING,
    allowNull: false
    
  },
   image: {
    type: Sequelize.STRING,
    allowNull: false
    
  }
  

}
);



// app.listen(4002, function () {

//   console.log('Example app listening on port 4000!');
// });

module.exports = User