'use strict';
const AWS = require('aws-sdk');
const openpgp = require('openpgp');
openpgp.config.show_version = false;
openpgp.config.show_comment = false;

module.exports.encrypts = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if(!event.Records[0].s3.object.key.endsWith('.pgp')){ // Don't try to encrypt files that are already encrypted
    console.log('Event key:', event.Records[0].s3.object.key);
    const s3 = new AWS.S3();
    const s3bucket = event.Records[0].s3.bucket.name;
    const s3key = event.Records[0].s3.object.key.replace(/\+/g,' ').replace(/%2B/g, '+');
    console.log('S3 bucket:', s3bucket);
    console.log('S3 key:', s3key);
  
    s3.getObject({
      'Bucket': s3bucket,
      'Key': s3key,
    }, function(err, data) {
      if (err) {
        console.log('Error fetching object:', err);
        return;
      }
      let fileBuffer = Buffer.from(data.Body);
      const openpgpPublicKey = openpgp.key.readArmored(Buffer.from(process.env.BASE64ENCODEDPUBLICKEY, 'base64').toString('ascii').trim());
      const fileForOpenpgpjs = new Uint8Array(fileBuffer);
      const options = {
        data: fileForOpenpgpjs,
        publicKeys: openpgpPublicKey.keys,
        armor: false
      };
      
      openpgp.encrypt(options).then(function(cipherText) {
        let encrypted = cipherText.message.packets.write();
        let s3params = {
          Body: Buffer.from(encrypted),
          Bucket: s3bucket,
          Key: s3key + '.pgp',
        };
        
        s3.putObject(s3params, function(err) {
          if(err){
            console.log(err, err.stack);
          }else{
            // Successfully encrypted file, delete unencrypted original
            let deleteParams = {
              Bucket: s3bucket,
              Key: s3key,
            };
            s3.deleteObject(deleteParams, function(err, data) {
              if(err){
                console.log(err, err.stack);
              }else{
                console.log('s3-pgp-encryptor replaced ' + s3bucket + '/' + s3key + ' with ' + s3key + '.pgp');
              }
            });
          }
        });
      }).catch((error) => {
        console.log('Encryption error:', error);
      });
    });
  }
};
