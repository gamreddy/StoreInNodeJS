import { MongoClient } from "mongodb";
import createDebugMessages from 'debug';
import products from "../data/products.json" with { type: "json" };
import customers from "../data/customers.json" with { type: "json" };
import orders from "../data/orders.json" with { type: "json" };

const debug  = createDebugMessages("dataService.js");
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

export async function createProducts(req, res){    
    let client;
    try{
        client = await MongoClient.connect(dbUrl);
        const db = client.db(dbName);
        const response = await db.collection("products").insertMany(products);
        res.json(response);
    }
    catch(err){
        debug(err.stack)
    }
}

export async function createCustomers(req, res){    
    let client;
    try{
        client = await MongoClient.connect(dbUrl);
        const db = client.db(dbName);
        const response = await db.collection("customers").insertMany(customers);
        res.json(response);
    }
    catch(err){
        debug(err.stack)
    }
}

export async function createOrders(req, res){    
    let client;
    try{
        client = await MongoClient.connect(dbUrl);
        const db = client.db(dbName);
        const response = await db.collection("orders").insertMany(orders);
        res.json(response);
    }
    catch(err){
        debug(err.stack)
    }
}