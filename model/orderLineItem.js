import {v4 as uuidv4} from "uuid";

export class OrderLineItem{
    constructor(code, quantity){
        this.id = uuidv4();
        this.code = code;
        this.quantity = quantity;
    }
}