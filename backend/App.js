
const express = require('express')
const Sequelize = require('sequelize');
const path = require('path')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json())

const getRegistered = require('./routes/routes')
const getLogin = require('./routes/routes')
const sequelize = require('./util/database')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(getRegistered)
//app.use(getLogin)



sequelize
.sync({force :true}).then(result =>{
	// console.log(result)
})
.catch(err =>{
	console.log(err)
})

app.get('/', (req, res)=>{
	res.send("<h3>Dilip</h3>")
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});

