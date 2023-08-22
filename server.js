const express = require('express')
const app = express()
const port = 3000
const students = require('./students')

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Server lol');
})


app.use('/after' , students)

app.listen(port,() => console.log(`app listening on port ${port}`))