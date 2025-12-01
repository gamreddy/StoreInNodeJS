import {v4 as uuidv4} from "uuid";

export class Order{
    constructor(customerEmail, lineItems){
        this.id = uuidv4();
        this.customerEmail = customerEmail;
        this.status = "PENDING";
        this.lineItems = lineItems;
    }
}