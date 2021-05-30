import {productsRouter} from "./routes";
import {cartsRouter} from "./routes";
import {connectToDB} from './repositories/index';

require('dotenv').config();
const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', (req, res)=>{
    res.render('index.ejs');
})

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(8080 || process.env.PORT, async( ) => {
    console.log(await connectToDB())
})