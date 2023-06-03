const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const jwt = require("jsonwebtoken")

const UserRoute = express.Router();

UserRoute.post("/register", async (req, res) => {
    try {
        let user = req.body;
        let { email, password, confirm_password } = user
        bcrypt.hash(password, 5, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.send({ "msg": "Please enter valid password" })
            }
            else {
                let newuser = new UserModel({ email, password: hash, confirm_password: hash });
                newuser.save();
                res.send({ "msg": "User Added Successfully" })
            }
        });
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

UserRoute.post("/login", async (req, res) => {
    try {
        let user = await UserModel.find({ email: req.body.email })
        if (user.length > 0) {
            let { email, password } = req.body;
            // res.send({ "msg": user })
            bcrypt.compare(password, user[0].password, function (err, result) {
                // result == true
                if (err) {
                    res.send({ "msg": "Enter valid password" })
                }
                else {
                    let token = jwt.sign({ userId: user[0]._id }, 'Mock8');
                    res.send({ "msg": "Login Successfully", token })
                }
            });
        }
        else {
            res.send({ "msg": "Enter correct email" })
        }
    } catch (error) {

    }
})

module.exports = UserRoute