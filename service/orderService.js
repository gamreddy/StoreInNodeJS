import { Order } from "../model/order.js";
import { OrderLineItem } from "../model/orderLineItem.js";
import { seedData } from "../data/seedData.js";

const orderData = [];

export function createSeed() {
    orderData.push(...seedData.orders);
}

export function createOrder(req, res) {
    try {        
        const order = new Order(req.body.customerEmail, req.body.lineItems.map(item => new OrderLineItem(item.code, item.quantity)));
        orderData.push(order);
        res.status(201).send(order);
    } catch (err) {
        res.status(500).send(err);
    }
}

export function getOrders(req, res) {
    try {
        const orders = orderData;
        if (!orders) {
            res.status(404).send("Orders not found");
        } else {
            res.send(orders);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export function getOrder(req, res) {
    try {
        const order = orderData.find(p => p.id === req.params.id);
        if (!order) {
            res.status(404).send("Order not found.");
        } else {
            res.send(order);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}