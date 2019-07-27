
const express = require('express')
const Sequelize = require('sequelize');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


//setting up connection
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

const Model = Sequelize.Model;

class User extends Model {}
User.init({
  
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING
   
  }
}, {
  sequelize,
  modelName: 'userData'
 
});


User.sync().then(() => {
  
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });

});


User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
}).catch(err => {
	console.log("err2432423423 =====>>>", err);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});