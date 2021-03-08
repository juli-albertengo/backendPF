const fs = require('fs')
const path = require('path')
import { json } from 'express';
import { Console } from 'node:console';
import {Product} from './products.service';

export class Cart {
    public id: string
    public timestamp: Date
    public products: Array<Product>

    constructor(id: string, timestamp: Date, products: Array<Product>){
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }
}

export class Carts {
    carts: Array<Cart>

    constructor(arrayCarts: Array<Cart>){
        this.carts = arrayCarts;
    }

    async getCartById(id: string){
        this.carts = await bringCartsFromDB();
        let cart = this.carts.find(cart => {
            return cart.id === id
        })
        if(!cart){
            return {}
        }
        return cart;
    }

    async addProductsToCart(id: string, productsToAdd: string){
        //Encontrar el carrito y modificarlo
        this.carts = await bringCartsFromDB();
        let cart = this.carts.find(cart => {
            return cart.id === id;
        })
        if(!cart){
            return {error : 'Producto no encontrado'}
        }
        let myProducts = JSON.parse(productsToAdd)
        cart.products = [...cart.products, ...myProducts]

        //Guardar el nuevo array de carts a la db
        let newSetCarts = this.carts.filter(cart => {
            return cart.id !== id
        })
        this.carts = [...newSetCarts, cart];
        saveCartsToDB(this.carts);

        return cart;
    }

    async deleteProductFromCart(id: string, productToDelete: string){
        //Encontrar el carrito
        this.carts = await bringCartsFromDB();
        let cart = this.carts.find(cart => {
            return cart.id === id;
        })
        if(!cart){
            return {error : 'Producto no encontrado'}
        }

        //Parseo el productos para borrar 
        let productoParaBorrar = JSON.parse(productToDelete)

        cart.products = cart.products.filter(product => {
            return product.id !== productoParaBorrar[0].id
        })

        //Guardar el nuevo array de carts a la db
        let newSetCarts = this.carts.filter(cart => {
            return cart.id !== id
        })
        this.carts = [...newSetCarts, cart];
        saveCartsToDB(this.carts);

        return cart;
    }
}

const bringCartsFromDB = async() => {
    try {
        const data = await fs.promises.readFile(`${path.join(__dirname + '/../repositories/carts.json')}`, 'utf-8');
        const carts = await JSON.parse(data);
        return carts;
    } catch (error){
        console.log(error);
        return [];
    }
}

const saveCartsToDB = async(carts: Array<Cart>) => {
    let parsedCarts = JSON.stringify(carts);
    try {
        await fs.promises.writeFile(`${path.join(__dirname + '/../repositories/carts.json')}`, parsedCarts);
    } catch (error){
        console.log(error);
        return [];
    }
}