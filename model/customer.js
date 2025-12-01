import {v4 as uuidv4} from "uuid";

export class Customer{
    constructor(name, email, address){
        this.id = uuidv4();
        this.email = email;
        this.name = name;
        this.address = address;
    }
}