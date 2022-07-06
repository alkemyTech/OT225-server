const AWS = require('aws-sdk')
require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.ONG_TEST_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ONG_TEST_AWS_SECRET_ACCESS_KEY
})

module.exports = { s3 };