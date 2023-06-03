const express = require('express');
const ProductModel = require('../models/product.model');

const ProductRoute = express.Router();


ProductRoute.post("/add", async (req, res) => {
    try {
        let product = new ProductModel(req.body);
        product.save();
        res.send({ "msg": "Added Successfully product" })
    } catch (error) {
        res.send({ "msg": error.message });
    }
})

ProductRoute.get("/", async (req, res) => {
    try {

        let products = await ProductModel.find()
        res.send({ "msg": products });
    } catch (error) {
        res.send({ "msg": error.message });
    }
})

ProductRoute.delete("/delete/:id", async (req, res) => {
    try {
        let Id = req.params.id;
        await ProductModel.findByIdAndDelete({ _id: Id });
        res.send({ "msg": "Successfully deleted" })
    } catch (error) {
        res.send({ "msg": error.message });
    }
})

ProductRoute.patch("/update/:id", async (req, res) => {
    try {
        let payload = req.body
        let Id = req.params.id;
        await ProductModel.findByIdAndUpdate({ _id: Id }, payload);
        res.send({ "msg": "Successfully Updated" })
    } catch (error) {
        res.send({ "msg": error.message });
    }
})


module.exports = ProductRoute;