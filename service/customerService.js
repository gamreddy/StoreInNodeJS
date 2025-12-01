import { Customer } from "../model/customer.js";
import { seedData } from "../data/seedData.js";

const customerData = [];

export function createSeed() {
    customerData.push(...seedData.customers);
}

export function getCustomers(req, res) {
    try {
        const customers = customerData;
        if (!customers || customers.length === 0) {
            res.status(404).send("Customers not found");
        } else {
            res.send(customers);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export function getCustomer(req, res) {
    try {
        const customer = customerData.find(p => p.id === req.params.id);
        if (!customer) {
            res.status(404).send("Customer not found.");
        } else {
            res.send(customer);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export function getCustomerByEmail(req, res){
    try {
        const customer = customerData.find(p => p.email === req.params.email);
        if (!customer) {
            res.status(404).send("Customer not found.");
        } else {
            res.send(customer);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }        
}