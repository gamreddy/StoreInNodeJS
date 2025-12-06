import { MongoClient, ObjectId } from "mongodb";
import createDebugMessages from 'debug';
import { Product } from "../model/product.js";

const debug  = createDebugMessages("productService.js");
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

async function createProduct(req, res){
    let client = new MongoClient(dbUrl);
    try{
        const db = client.db(dbName);
        //const product = await db.collection("products").insertOne({...req.body});
        const product = await db.collection("products")
            .insertOne(new Product(req.body.code, req.body.name, req.body.description, req.body.price, req.body.stock ));        
        
        res.status(201).send(product);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

async function getProducts(req, res){
    let client = new MongoClient(dbUrl);
    try{
        const db = client.db(dbName);
        const products = await db.collection("products").find().toArray();
        res.send(products);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }
}

async function getProduct(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const product = await db.collection("products").findOne({_id: new ObjectId(id)});
        if (!product) {
            res.status(404).send("Product not found.");
        } else {
            res.send(product);
        }
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

async function getProductByCode(req, res){
    const code = req.params.code;
    let client = new MongoClient(dbUrl);    
    try{        
        const db = client.db(dbName);
        const product = await db.collection("products").findOne({code: code});
        if (!product) {
            res.status(404).send("Product not found.");
        } else {
            res.send(product);
        }
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }        
}

async function deleteProduct(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const result = await db.collection("products").deleteOne({_id: new ObjectId(id)});
        if(result.deletedCount){
            res.status(204).send();
        }else{
            res.status(404).send("Product not found.");
        }
        
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }        
}

async function updateProduct(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const product = await db.collection("products").findOneAndUpdate(
            {id: new ObjectId(id)}, 
            {                
                $set: {
                    ...req.body
                },                
            });
        res.send(product);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

export { createProduct, getProducts, getProduct, getProductByCode, deleteProduct, updateProduct }