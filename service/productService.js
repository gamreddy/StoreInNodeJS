import { Product } from "../model/product.js";
import { seedData } from "../data/seedData.js";

const productData = [];

function createSeed() {
    productData.push(...seedData.products);
}

function createProduct(req, res) {
    try {
        const product = new Product(req.body.code, req.body.name, req.body.description, req.body.price, req.body.stock);
        productData.push(product);
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
}

function getProducts(req, res) {
    try {
        const products = productData;
        if (!products || products.length === 0) {
            res.status(404).send("Products not found");
        } else {
            res.send(products);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

function getProduct(req, res) {
    try {
        //console.log(productData);
        const product = productData.find(p => p.id === req.params.id);
        if (!product) {
            res.status(404).send("Product not found.");
        } else {
            res.send(product);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

function getProductByCode(req, res){
    try {
        //console.log(productData);
        const product = productData.find(p => p.code === req.params.code);
        if (!product) {
            res.status(404).send("Product not found.");
        } else {
            res.send(product);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }    
}

function deleteProduct(req, res){
    try {
        //console.log(productData);
        const index = productData.findIndex(p => p.id === req.params.id);
        if (index !== -1) {
            productData.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send("Product not found.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

function updateProduct(req, res){
    try {
        //console.log(req.body);
        const index = productData.findIndex(p => p.id === req.params.id);
        if (index !== -1) {
            productData[index] = {...productData[index], ...req.body};
            res.send(productData[index]);
        } else {
            res.status(404).send("Product not found.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export { createSeed, createProduct, getProducts, getProduct, getProductByCode, deleteProduct, updateProduct }