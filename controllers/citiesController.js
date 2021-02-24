const db = require('../models');

const index = (req, res) => {
    db.City.find({}, (err, allCities) => {
        if (err) return console.log(err);

        res.json(allCities)
    });
};

const show = (req, res) => {
    db.City.findById(req.body._id, (err, foundCity) => {
        if (err) return console.log(err);

        res.json(foundCity);
    });
};

const create = (req, res) => {
    console.log(req.body)
    db.City.create(req.body, (err, newCity) => {
        if (err) throw err
        res.json(newCity)
    })
}

module.exports = {
    index,
    show,
    create
};