const express = require('express');
const {sendNewOrderEmail} = require('../utils/nodemailer');
const {orderModel} = require('../repositories');

const orderRouter = express.Router();

//POST => Generar Orden
orderRouter.post('/', async(req, res)=> {
    const {items, nroOrder, timestamp, status, email} = req.body;
    const newOrder = new orderModel();
    newOrder.items = items;
    newOrder.nroOrder = nroOrder;
    newOrder.timestamp = timestamp;
    newOrder.status = status,
    newOrder.email = email;
    try {
        const savedOrder = await newOrder.save();
        try {
            sendNewOrderEmail(savedOrder.email);
        } catch(error){
            console.log(error);
        }
        res.json(savedOrder);
    } catch (error) {
        console.log(error);
        res.json({error: `There has been an error saving your order, please try again.`})
    }
})

export default orderRouter;
