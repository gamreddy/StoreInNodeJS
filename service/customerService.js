import { Customer } from "../model/customer.js";
import { MongoClient, ObjectId } from "mongodb";
import createDebugMessages from 'debug';

const debug  = createDebugMessages("customerService.js");
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

async function getCustomers(req, res){
    let client = new MongoClient(dbUrl);
    try{
        const db = client.db(dbName);
        const customers = await db.collection("customers").find().toArray();
        res.send(customers);
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }
}

async function getCustomer(req, res){
    const id = req.params.id;
    let client = new MongoClient(dbUrl);    
    try{
        const db = client.db(dbName);
        const customer = await db.collection("customers").findOne({_id: new ObjectId(id)});
        if (!customer) {
            res.status(404).send("Customer not found.");
        } else {
            res.send(customer);
        }
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }    
}

async function getCustomerByEmail(req, res){
    const email = req.params.email;
    let client = new MongoClient(dbUrl);    
    try{        
        const db = client.db(dbName);
        const customer = await db.collection("customers").findOne({email: email});
        if (!customer) {
            res.status(404).send("Customer not found.");
        } else {
            res.send(customer);
        }
    }catch(err){
        debug(err.stack);
        res.status(500).send(err);
    }finally{
        client.close();
    }        
}

export { getCustomers, getCustomer, getCustomerByEmail}