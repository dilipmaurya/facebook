const express = require('express')
const app = express()
const port = 9000;



app.use(express.json());

require('../routes/routes')(app);
app.listen(port)
