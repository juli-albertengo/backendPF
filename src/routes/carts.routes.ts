require('dotenv').config();
const express = require('express');
const passport = require('passport');
import {cartsServices} from '../services/index'


const cartsRouter = express.Router();

let carts = new cartsServices.Carts([])

cartsRouter.get('/', passport.authenticate('jwt', { session: false }),  (req, res)=> {
    const user = req.user;
    res.json({message: `Congratulations ${user.firstName} you made it to the protected route!`});
})

//PORT carts/ => Incorporar un carrito a la DB => Generar una orden de compra
cartsRouter.post('/', async(req, res)=>{
    const {email, timestamp, deliveryAddress, products} = req.body;
    const cart = {
        email,
        timestamp,
        deliveryAddress,
        products
    }
    let addedCart = await carts.addCart(cart);
    res.json(addedCart);
})

//GET /carts/:carrito_id  => Obtener un carrito por su ID
cartsRouter.get('/id/:id', async(req, res) => {
    const {id} = req.params
    let cart = await carts.getCartById(id)
    res.send(cart);
})

//PATCH /carts/:carrito_id => Agregar producto(s) al carrito
//PATCH /carts/:carrito_id => Eliminar producto(s) del carrito
cartsRouter.patch('/id/:id', async(req, res) => {
    const {id} = req.params
    const {productsToAdd, productToDelete} = req.body;
    if(productsToAdd){
        let cart = await carts.addProductsToCart(id, productsToAdd)
        res.json(cart);
    } else if (productToDelete){
        let cart = await carts.deleteProductFromCart(id, productToDelete)
        res.json(cart);
    } else {
        res.json({error: `Must provide either productsToAdd or productToDelete`})
    }

})


export default cartsRouter;