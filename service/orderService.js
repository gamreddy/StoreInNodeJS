import { Order } from "../model/order.js";
import { OrderLineItem } from "../model/orderLineItem.js";

import { MongoClient, ObjectId } from "mongodb";
import createDebugMessages from 'debug';

const debug  = createDebugMessages("orderService.js");
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

async function createOrder(req, res){
    let client = new MongoClient(dbUrl);
    try{
        const db = client.db(dbName);       
        const order = await db.collection("orders")
            .insertOne(
                new Order(req.body.customerEmail, 
                    req.body.lineItems.map(item => 
                        new OrderLineItem(item.code, item.quantity))));        
        
        res.status(201).send(order);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

async function getOrders(req, res){
    let client = new MongoClient(dbUrl);
    try{
        const db = client.db(dbName);
        const orders = await db.collection("orders").find().toArray();
        res.send(orders);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }
}

async function getOrder(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const order = await db.collection("orders").findOne({_id: new ObjectId(id)});
        if (!order) {
            res.status(404).send("Order not found.");
        } else {
            res.send(order);
        }
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

async function deleteOrder(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const result = await db.collection("orders").deleteOne({_id: new ObjectId(id)});
        if(result.deletedCount){
            res.status(204).send();
        }else{
            res.status(404).send("Order not found.");
        }
        
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }        
}

async function updateOrder(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const order = await db.collection("orders").findOneAndUpdate(
            {_id: new ObjectId(id)}, 
            {                
                $set: {
                    ...req.body
                },                
            },
        {returnDocument: 'after'});
        res.send(order);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

export { createOrder, getOrders, getOrder, deleteOrder, updateOrder }