const express = require('express');
import {cartsServices} from '../services/index'

const cartsRouter = express.Router();

let carts = new cartsServices.Carts([])

//GET /carritos/:carrito_id  => Obtener un carrito por su ID
cartsRouter.get('/:id', async(req, res) => {
    const {id} = req.params
    let cart = await carts.getCartById(id)
    res.send(cart);
})

//PATCH /carritos/:carrito_id => Agregar producto(s) al carrito
//PATCH /carritos/:carrito_id => Eliminar producto(s) del carrito
cartsRouter.patch('/:id', async(req, res) => {
    const {id} = req.params
    const {productsToAdd, productToDelete} = req.body;
    if(productsToAdd){
        let cart = await carts.addProductsToCart(id, productsToAdd)
        res.send(cart);
    }
    if(productToDelete){
        let cart = await carts.deleteProductFromCart(id, productToDelete)
        res.send(cart);
    }

})


export default cartsRouter;