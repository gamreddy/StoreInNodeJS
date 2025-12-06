export class Product{
    constructor(code, name, description, price, stock){
        
        if(typeof code !== "string" || typeof name !== "string" || typeof description !== "string"){
            throw new Error("code, name and description must be numbers.");
        }

        if(typeof price !== "number" || typeof stock !== "number"){
            throw new Error("price and stock must be numbers.");
        }

        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}