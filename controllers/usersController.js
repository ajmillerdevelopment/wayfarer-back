const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');


// SIGN UP
const signup = (req, res) => {
    bcrypt.genSalt(10, (err, salt)=>{
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            const newUser = {
                username: req.body.username,
                avatar: req.body.avatar,
                email: req.body.email,
                password: hashedPassword,
            }

            db.User.create(newUser, (err, createdUser) => {
                if (err) throw err;
                req.session.user = createdUser;
                res.json(createdUser);
            })
        })
    })
};

// LOG IN
const login = (req, res) => {
    db.User.findOne( { email: req.body.email }, (err, foundUser) => {
        if (err) throw err;

        if (!foundUser) {
            return res.send('User does not exist');
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
            if (err) throw err;

            if (result) {
                req.session.user = foundUser;
                res.json(foundUser);
            }
            else {
                res.send('invalid password');
            }
        })
    })
};

module.exports = {
    signup,
    login,
};