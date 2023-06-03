const express = require('express');
const { connection } = require('./config/db');
const UserRoute = require('./routes/user.route');
const authenticate = require('./middleware/authenticate');
const ProductRoute = require('./routes/product.route');
require("dotenv").config();
const cors = require('cors');


const app = express();
app.use(express.json())
app.use(cors())
app.use("/user", UserRoute)

app.get("/", (req, res) => {
    res.send({ "msg": "Homepage" })
})

app.use(authenticate)

app.use("/product", ProductRoute)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connetced to db");
    } catch (error) {
        console.log(error.message)
    }
    console.log("Listening")
})