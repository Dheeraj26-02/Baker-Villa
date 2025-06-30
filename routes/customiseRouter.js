const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const router = express.Router();
const upload = require("../config/multer-config");
const customiseModel = require('../models/customise-model');
const isloggedin = require("../middlewares/isLoggedin");
const Razorpay = require("razorpay");
const {createOrder, verifyPayment} = require('../controllers/payment');



// // Mock DB (Replace this with your DB query)
const priceList = {
    "Chocolate": { "0.5": 300, "1": 550, "2": 1000, "3": 1450 },
    "Vanilla": { "0.5": 250, "1": 500, "2": 950, "3": 1350 },
    "Red Velvet": { "0.5": 350, "1": 600, "2": 1100, "3": 1600 }
};

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});
// // Render cake form
router.get('/', (req, res) => {
    res.render('customization', { priceList });
});


// // Order submission
router.post('/customiseCake', isloggedin, upload.single('photo'), async (req, res) => {
    try {
        const { flavour, weight, amount } = req.body;
        const file = req.file;

        const user_email = req.user.email;
        
        if (!req.file) {
            req.flash("error", "Image is required.");
            return res.redirect("/customise");
        }
        const customiseOrder=await customiseModel.create({
            userId: req.user._id,
            flavour: flavour,
            weight: weight,
            amount: amount,
            image: file.buffer,
        });
        
        createOrder(req,res);
        
        
        
    } catch (e) {
        console.error(e.message);
        res.status(500).send(e.message);
    }
});
router.post('/verifyOrder', verifyPayment);


module.exports = router;