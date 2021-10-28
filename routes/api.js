"use strict";
const nodemailer = require("nodemailer");
const Email = require('email-templates');
const express = require('express');

const router = express.Router();
const pug = require('pug');

router.get("/", (req, res) => {
    const invoice = [
    {firstName: 'Diana', 
    lastName: 'One', 
    payment: [{item: 'btc', price: 500}, {item: 'doge', price: 300}]}
    ];

    req.app.locals.userNames = ["Sean", "George", "Roger", "Timothy", "Pierce", "Daniel"];
    req.app.locals.userInvoice = [{item: 'btc', price: 1200}, {item:'doge', price:900}, {item:'xmr', price: 222}];


    let total = 0;
    invoice.forEach((x, i) => {
        x.payment.forEach((y) => {
            total = y.price + total
        })
        invoice[i].total = total;
    })
    req.app.locals.userInvoices = invoice;

    res.render("homepage");
});

router.get("/checkout-pug", (req, res) => {
    

    // res.render("./greet/assets")
    res.render("./greet/greeting");
});

router.post("/send", (req, res) => {
    const email = new Email({
        message: {
            from: 'hi@example.com'
        },
        send: true,
        transport: {
            host: 'smtp.mailtrap.io',
            port: 2525,
            ssl: false,
            tls: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        }
    });

    const people = [
        {
            firstName: 'Diana', 
            lastName: 'One', 
            payment: [
                {item: 'btc', price: 500}, 
                {item: 'doge', price: 300}
            ] 
        },
    ];

    people.forEach((person) => {
        email.send({
            template: 'welcome',
            message: {
            to: 'test@example.com'
            },
            locals: person
        })
        .then(console.log)
        .catch(console.error);
    })

    return res.send('successfully send email');
})


module.exports = router;
