const { s3 } = require('../config/aws');

const BUCKET_NAME = process.env.ONG_TEST_AWS_BUCKET_NAME;

/**
 * Upload Image to AWS3
 * @param  {string}  image base64 image
 * @return {string}  Image url
 */
const imageUpload = async (image) => {

    try {

        // Decode Image on base64
        const imageDecoded = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        
        // Getting the image type
        const imageType = image.split(';')[0].split('/')[1];

        // Get a format date to set name for image
        const date = Date.now();
        
        const params = {
            Bucket: BUCKET_NAME,
            Key: `${date}.${imageType}`,
            Body: imageDecoded,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${imageType}`
        };

        let location;
        let key;

        try {
            const { Location, Key } = await s3.upload(params).promise();
            location = Location;
            key = Key;
        } catch (error) {
            console.log(error)
        }

        return location;

    } catch (error) {
        console.log(error)
    }
};


module.exports = { imageUpload }