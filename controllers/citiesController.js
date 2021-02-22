const db = require('../models');

const index = (req, res) => {
    db.City.find({}, (err, allCities) => {
        if (err) return console.log(err);

        res.json(allCities)
    });
};

const show = (req, res) => {
    db.City.findById(req.params.cityid, (err, foundCity) => {
        if (err) return console.log(err);

        res.json(foundCity);
    });
};

module.exports = {
    index,
    show,
};