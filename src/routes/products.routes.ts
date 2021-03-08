const express = require('express');
import {productsServices} from '../services/index'

const productsRouter = express.Router();

let productos = new productsServices.Products([])

//GET /productos => Me permite listar todos los productos disponibles
productsRouter.get('/', async (req, res)=> {
    let products = await productos.getAllProducts();
    res.send(products);
})

//GET /productos/:producto_id  =>  Obtener un producto por su id
productsRouter.get('/:id', async (req, res)=> {
    const {id} = req.params;
    let product = await productos.getProductById(id);
    res.send(product);
})

//POST /productos => Para incorporar productos al listado
productsRouter.post('/', async (req, res)=> {
    const {id, timestamp, name, description, code, foto, price, stock} = req.body;
    let product = {
        id,
        timestamp,
        name,
        description,
        code,
        foto, 
        price,
        stock
    }
    let addedProduct = await productos.addProduct(product);
    res.send(addedProduct);
})

//PATCH /productos/:producto_id => Actualiza un producto por su id
productsRouter.patch('/:id', async (req, res)=> {
    const {id, timestamp, name, description, code, foto, price, stock} = req.body;
    let product = {
        id,
        timestamp,
        name,
        description,
        code,
        foto, 
        price,
        stock
    }
    let modifiedProduct = await productos.updateProductById(id, product);
    res.send(modifiedProduct);
})

//DELETE /productos/:producto_id => Borra un producto por su id
productsRouter.delete('/:id', async (req, res)=> {
    const {id} = req.params;
    let deletedProduct = await productos.deleteProduct(id);
    res.send(deletedProduct);
})

export default productsRouter;







