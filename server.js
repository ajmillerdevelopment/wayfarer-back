const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;





// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Wayfarer</h1>')
})


app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});