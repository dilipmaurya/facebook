
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

const User = sequelize.define('login', {
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    
  }
  

}
);



app.listen(4002, function () {

  console.log('Example app listening on port 4000!');
});

module.exports = User