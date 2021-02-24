require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = process.env.PORT || 4000;
const cors = require('cors')

<<<<<<< HEAD
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/city', routes.cities)
=======
// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// SESSION
app.use(session({
    secret: "secrets are no fun",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
    },
}));

// ROUTES
app.use('/city', routes.cities);
app.use('/users', routes.users);
>>>>>>> submaster


// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Wayfarer</h1>');
})


app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});