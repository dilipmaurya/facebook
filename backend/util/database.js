
const Sequelize = require('sequelize')

//setting connection

const sequelize = new Sequelize('postgres', 'postgres', 'dilip', {

host:'localhost',
dialect :'postgres'

})

module.exports = sequelize;