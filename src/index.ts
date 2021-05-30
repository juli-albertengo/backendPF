require('dotenv').config();
const express = require('express');
const app = express()

import {productsRouter} from "./routes";
import {cartsRouter} from "./routes";
import {connectToDB} from './repositories/index';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './public/views');
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index.ejs');
})

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(8080 || process.env.PORT, async( ) => {
    console.log(await connectToDB())
})



/*
app.get('/public/css/styles.css', (req, res)=>{
    res.set('Content-Type', 'text/css');
    res.send('/public/css/styles.css')
})
*/