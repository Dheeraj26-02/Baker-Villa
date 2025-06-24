const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const router = express.Router();
const upload = require("../config/multer-config");



// // Mock DB (Replace this with your DB query)
const priceList = {
    "Chocolate": { "0.5": 300, "1": 550, "2": 1000, "3": 1450 },
    "Vanilla": { "0.5": 250, "1": 500, "2": 950, "3": 1350 },
    "Red Velvet": { "0.5": 350, "1": 600, "2": 1100, "3": 1600 }
};


// // Render cake form
router.get('/', (req, res) => {
    res.render('customization',{priceList});
});


// // Order submission
router.post('/customiseCake', upload.single('photo'), (req, res) => {
    const { flavour, weight,price } = req.body;
    const file = req.file;

    console.log('🎂 Order Received:', { flavour, weight, price, file });

    res.send(`<h2>Thanks for your order! 🎉<br>Flavour: ${flavour}<br>Weight: ${weight}kg<br>Price: ₹${price}</h2>`);
});


module.exports = router;