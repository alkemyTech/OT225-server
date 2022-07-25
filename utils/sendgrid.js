const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const path = require('path')
require("dotenv").config();

const sender = process.env.SENDGRID_TEST_EMAIL
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, name) => {

    const msg = {
        to: email,
        from: `ONG 225 <${sender}>`,
        subject: `${name} tu registro ha sido exitoso`,
        html: await readFile(path.join(__dirname + '/template-mail.html'), 'utf-8')
    };

    try {
       let response =  await sgMail.send(msg);
       if(response[0].statusCode == 202) console.log('Email sent succesfully')
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }

};

module.exports = { sendEmail };