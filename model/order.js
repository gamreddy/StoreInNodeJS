export class Order{
    constructor(customerEmail, status = "PENDING", lineItems){
        this.customerEmail = customerEmail;
        this.status = status;
        this.lineItems = lineItems;
    }
}