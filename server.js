require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routes = require('./routes');
const PORT = process.env.PORT || 4000;
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/city', routes.cities)


// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Wayfarer</h1>')
})


app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});