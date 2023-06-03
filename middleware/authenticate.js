const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    let token = req.headers.authorization
    jwt.verify(token, 'Mock8', function (err, decoded) {
        if (err) {
            res.send({ "msg": "Enter valid Password" })
        }
        else {
            next()
        }
    });
}

module.exports = authenticate