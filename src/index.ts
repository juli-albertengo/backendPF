import {productsRouter} from "./routes";
import {cartsRouter} from "./routes";

require('dotenv').config();
const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(8080 || process.env.PORT, ( ) => {
    'Your app is listening'
})