const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bearerToken = require('express-bearer-token');

app.use(bodyParser())
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.status(200).send('<h1>HIDUP ADALAH UJIAN</h1>')
})

const { publicRouter } = require('./router')
app.use('/public', publicRouter)


app.listen(2000, () => console.log(2000))
