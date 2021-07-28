"use strict";
const nodemailer = require("nodemailer");
const Email = require('email-templates');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'c4e08c4b413c43', // your Mailtrap username
        pass: 'b7c7d2c54bdfbe' //your Mailtrap password
    },
  });

  transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

//  var mailOptions = {
//     from: '"Example Team" <from@example.com>',
//     to: 'user1@example.com, user2@example.com',
//     subject: 'Nice Nodemailer test',
//     text: 'Hey there, it’s our first message sent with Nodemailer ',
//     html: '<a href="https://imgbb.com/"><img src="https://i.ibb.co/vHhqGfQ/sharingan.png" alt="sharingan" border="0" /></a>',
//     attachments: [
//     //   {   // utf-8 string as an attachment
//     //       filename: 'text.txt',
//     //       content: 'Attachments'
//     //   },
//       {
//           filename: 'logo',
//           path: 'https://ibb.co/FKX3Mc0'
//       }
//     ]
//   };

var mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: 'user1@example.com, user2@example.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
    attachments: [
      {
        filename: 'mailtrap.png',
        path: 'https://i.ibb.co/vHhqGfQ/sharingan.png',
        cid: 'uniq-mailtrap.png'
      }
    ]
};


  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

main().catch(console.error);