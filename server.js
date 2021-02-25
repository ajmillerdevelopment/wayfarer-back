require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = process.env.PORT || 4000;
const cors = require('cors')
const controllers = require('./controllers');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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
app.use('/users', routes.users);

app.get('/cities', controllers.cities.index);
app.get('/city', controllers.cities.show); //Inop, needs fixing back to params method
app.get('/posts', controllers.posts.index);
app.post('/city', controllers.cities.create)
app.get('/post/:postid', controllers.posts.show)
app.get('/comment/', controllers.comments.show) //Inop, needs fixing back to params method
app.post('/post', controllers.posts.create)
app.put('/post', controllers.posts.edit)
app.delete('/post/', controllers.posts.destroy)
app.post('/comment/', controllers.comments.create)
app.put('/comment/', controllers.comments.edit)
app.delete('/comment/', controllers.comments.destroy)

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Wayfarer</h1>');
})


app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});