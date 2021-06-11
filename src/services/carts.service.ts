import {cartModel} from '../repositories/index';
import {Product} from './products.service';

export class Cart {
    public id: string
    public email: string
    public timestamp: Date
    public deliveryAddress: string
    public products: Array<Product>

    constructor(id: string, email: string, timestamp: Date, deliveryAddress: string, products: Array<Product>){
        this.id = id;
        this.email = email;
        this.timestamp = timestamp;
        this.deliveryAddress = deliveryAddress;
        this.products = products;
    }
}

export class Carts {
    carts: Array<Cart>

    constructor(arrayCarts: Array<Cart>){
        this.carts = arrayCarts;
    }

    async getCartById(id: string){
        try {
            let cart = await cartModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            return cart;
        } catch (error){
            console.log(error)
            return {};
        }
    }

    async addProductsToCart(id: string, productsToAdd: string){
        //Encontrar el carrito y modificarlo
        try {
            let cart = await cartModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            let myProducts = JSON.parse(productsToAdd)
            cart.products = [...cart.products, ...myProducts]
            //Guardar el nuevo cart a la DB
            try {
                let modifiedCart = await cart.save();
                return modifiedCart
            } catch (error) {
                console.log(error);
                return {error: `There has been an error saving cart => ${error}`}
            }
        } catch (error){
            console.log(error)
            return {};
        }
    }

    async deleteProductFromCart(id: string, productToDelete: string){
        //Encontrar el carrito
        try {
            let cart = await cartModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            let productoParaBorrar = JSON.parse(productToDelete)
            cart.products = cart.products.filter(product => {
                return product.id !== productoParaBorrar[0].id
            })
            //Guardar el nuevo cart a la DB
            try {
                let modifiedCart = await cart.save();
                return modifiedCart
            } catch (error) {
                console.log(error);
                return {error: `There has been an error saving cart => ${error}`}
            }
        } catch (error){
            console.log(error)
            return {};
        }
    }
}