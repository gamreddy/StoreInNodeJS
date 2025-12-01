import { Product } from "../model/product.js";
import { Customer } from "../model/customer.js";
import { Order } from "../model/order.js";
import { OrderLineItem } from "../model/orderLineItem.js";

export const seedData = {};

let productJson = `[{"code":"CHI-001", "name":"CHI Silk Infusion", "description":"CHI Silk Infusion", "price":29.99, "stock":100}, 
{"code":"BIO-001", "name":"BioSilk Silk Therapy", "description":"BioSilk Silk Therapy", "price":24.99, "stock":50}, 
{"code":"CHI-002", "name":"CHI Flat Iron", "description":"CHI Flat Iron", "price":89.99, "stock":25}, 
{"code":"BIO-002", "name":"BioSilk Smoothing Shampoo", "description":"CHI Flat Iron", "price":19.99, "stock":75}]`;

let products = JSON.parse(productJson);
seedData.products = products.map(product => new Product(product.code, product.name, product.description, product.price, product.stock) );

let customerJson = `[{"name":"John", "email":"John@yahoo.com", "address":"Houston, TX"},
{"name":"Peter", "email":"Peter@yahoo.com", "address":"Austin, TX"},
{"name":"Sam", "email":"Sam@yahoo.com", "address":"Dallas, TX"}]`;

let customers = JSON.parse(customerJson);
seedData.customers = customers.map(customer => new Customer(customer.name, customer.email, customer.address));

let orderJson = `[{"customerEmail":"John@yahoo.com","status":"PENDING","lineItems":[{"code":"CHI-001","quantity":5}]},
{"customerEmail":"Peter@yahoo.com","status":"PENDING","lineItems":[{"code":"CHI-001","quantity":90}]},
{"customerEmail":"Sam@yahoo.com","status":"PENDING","lineItems":[{"code":"CHI-001","quantity":10}]}]`;

let orders = JSON.parse(orderJson);
seedData.orders = orders.map(order => new Order(order.customerEmail, order.lineItems.map(lineItem => new OrderLineItem(lineItem.code, lineItem.quantity))));
