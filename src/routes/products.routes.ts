const express = require('express');
import {productsServices} from '../services/index'

const productsRouter = express.Router();

let productos = new productsServices.Products([])

//GET /productos => Me permite listar todos los productos disponibles
productsRouter.get('/', async (req, res)=> {
    let products = await productos.getAllProducts();
    res.render('products.ejs', {products});
})

//GET /productos/:producto_id  =>  Obtener un producto por su id
productsRouter.get('/id/:id', async (req, res)=> {
    const {id} = req.params;
    let product = await productos.getProductById(id);
    res.render('singleProduct.ejs', {product});
})

//GET /productos/:category => Obtener productos por su categoria
productsRouter.get('/category/:category', async (req, res)=> {
    const {category} = req.params;
    let products = await productos.getProductsByCategory(category);
    res.send(products);
})


//POST /productos => Para incorporar productos al listado
productsRouter.post('/', async (req, res)=> {
    const {timestamp, name, description, code, foto, price, stock} = req.body;
    let product = {
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
        _id: id,
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



/* Other routes I could potentially use

//GET /productos/:producto_name  =>  Obtener productos por su nombre
productsRouter.get('/name/:name', async (req, res)=> {
    const {name} = req.params;
    let products = await productos.getProductsByName(name);
    res.send(products);
})

//GET /productos/:producto_pricerange  =>  Obtener productos por su nombre
productsRouter.get('/price', async (req, res)=> {
    let min = req.query.min;
    let max = req.query.max;
    let products = await productos.getProductsByPriceRange(min, max);
    res.send(products);
})

*/




