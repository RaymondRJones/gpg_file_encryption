const AWS = require('aws-sdk');
const openpgp = require('openpgp');
const s3 = new AWS.S3();

exports.encrypt = async (event) => {
    try {
        // Define your S3 buckets
        const inputBucket = 'myawsbucket-upwork';
        const outputBucket = 'myawsbucket-upwork-output';

        // Get the object key from the event
        const objectKey = event.Records[0].s3.object.key;

        // Read the CSV from the source S3 bucket
        const getObjectParams = {
            Bucket: inputBucket,
            Key: objectKey,
        };
        console.log('About to read from S3');
        const s3Object = await s3.getObject(getObjectParams).promise();
        console.log('Successfully read from S3');
        const csvData = s3Object.Body.toString('utf-8');
        console.log('Successfully converted to string', csvData.substring(0, 50));  // Print only first 50 characters to avoid overwhelming the log


        // Your OpenPGP key and passphrase setup here
        const publicKeyArmored = `
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
kQm3IX0ZMFDRw/m/1cpI06DxYdZE
=RI+e
-----END PGP PUBLIC KEY BLOCK-----
`;
        
          const privateKeyArmored = `
-----BEGIN PGP PRIVATE KEY BLOCK-----
-----END PGP PRIVATE KEY BLOCK-----
`;
        const passphrase = 'upwork';

        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
        
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
        console.log('About to encrypt');
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: csvData }),
            encryptionKeys: publicKey,
            signingKeys: privateKey
        });
        console.log('Encryption complete');

        // Upload the encrypted file to the destination S3 bucket
        const putObjectParams = {
            Bucket: outputBucket,
            Key: `encrypted_${objectKey}`,
            Body: encrypted,
            ContentType: 'text/csv'
        };
        console.log('About to upload to S3');
        await s3.putObject(putObjectParams).promise();
        console.log('Successfully uploaded to S3');

        console.log('Encryption and upload complete');

        return {
            statusCode: 200,
            body: JSON.stringify('Encryption and upload complete!'),
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('An error occurred'),
        };
    }
};
