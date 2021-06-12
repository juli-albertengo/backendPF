require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwtStrategy = require('./middleware/passportAuth');
const app = express()

const PORT = 8080 || process.env.PORT

import {connectToDB} from './repositories/index';
import {productsRouter} from "./routes";
import {cartsRouter} from "./routes";
import {authRouter} from "./routes";
import {orderRouter} from "./routes";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
passport.use(jwtStrategy);

//app.set('view engine', 'ejs');
//app.set('views', './public/views');
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);

app.get('/', (req, res)=>{
    res.status(200)
    res.json({message: `Welcome Page`});
})

app.get('/error', (req, res)=> {
    res.json({message: "There has been an unexpected error, please try again."})
})

app.get('/*', (req, res) => {
    res.json({message: `There's nothing to see here`});
})

const startServer = async() => {
    const connected = await connectToDB();
    if(connected == 'DB Connection established'){
        app.listen(PORT, ()=> {
            console.log(`${connected} => App listening on port ${PORT}`);
        })
    } else {
        console.log(`There has been an error connecting to the DB => ${connected}`)
    }
}

startServer();

// Function to be used when localhost doesn't take my stylesheets
app.get('/public/css/styles.css', (req, res)=>{
    res.set('Content-Type', 'text/css');
    res.send('/public/css/styles.css')
})

app.get('/auth/css/styles.css', (req, res)=>{
    res.set('Content-Type', 'text/css');
    res.send('/public/css/styles.css')
})

