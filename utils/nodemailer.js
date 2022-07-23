const nodemailer = require("nodemailer");
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const path = require('path');
require("dotenv").config();

const sendEmail = async (email, name) => {
    try {
        // Settings
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_TEST_USER,
                pass: process.env.EMAIL_TEST_PASS
            },
            // debug: true, // show debug output
            // logger: true // log information in console
        });

        // Send Email
        let info = await transporter.sendMail({
            from: '"ONG 225" <ong@ong.com>',
            to: email,
            subject: `${name} tu registro ha sido exitoso`,
            html: await readFile(path.join(__dirname + '/template-mail.html'), 'utf-8')
        });

        if (info.accepted) {
            console.log("Email sent succesfully")
        } else {
            console.log("Email could not be sent")
        }
    } catch (error) {
        console.log(error)
    }
};

const contactEmail = async (email) => {
    try {
        // Settings
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_TEST_USER,
                pass: process.env.EMAIL_TEST_PASS
            },
            // debug: true, // show debug output
            // logger: true // log information in console
        });

        // Send Email
        let info = await transporter.sendMail({
            from: '"ONG 225" <ong@ong.com>',
            to: email,
            subject: `Contacto registrado`,
            html: await readFile(path.join(__dirname + '/contact-mail.html'), 'utf-8')
        });

        if (info.accepted) {
            console.log("Email sent succesfully")
        } else {
            console.log("Email could not be sent")
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = { sendEmail, contactEmail };