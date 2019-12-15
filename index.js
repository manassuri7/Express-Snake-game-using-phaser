//npm init -y, npm i express
//node index.js to start server
//to set up the server
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname+'/public/')); //to use all the static files

//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))