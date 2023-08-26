const openpgp = require('openpgp');
const fs = require('fs').promises;  // Use promises for async operations

(async () => {

    const publicKeyArmored = `
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
kQm3IX0ZMFDRw/m/1cpI06DxYdZE
=RI+e
-----END PGP PUBLIC KEY BLOCK-----
`;

  const privateKeyArmored = `
-----BEGIN PGP PRIVATE KEY BLOCK-----

lIYEZOdq8hYJKwYBBAHaRw8BAQdAObs0ViGVOQnCJfAtqVdIJUfpZWBeT9qPMqmO
Uq8fNi3+BwMC3W96HJCyGc/7lYf1u1PmnS1/O9uYoc+LlFqMheQoqZsmgDxERS/U
MhJu5GSAWosjA7TIuNy2ZdpH29SRQnvXAnHkV5K418TjviR+UBPJ9bQcUmF5IDxy
YXlqb25lczIxNzBAZ21haWwuY29tPoiZBBMWCgBBFiEEVrFdedrgOhJXiYoxp4yp
c0vrLSMFAmTnavICGwMFCQWjmoAFCwkIBwICIgIGFQoJCAsCBBYCAwECHgcCF4AA
CgkQp4ypc0vrLSPR/gD9FA8fIZf96XSRzM8Uc1DgfrRF6r/J2WjeGMMnk/NwwrwB
APpX2NuDAQfT5ALtDHHFWDMFloFYAR5C4CNUBA0r3KsInIsEZOdq8hIKKwYBBAGX
VQEFAQEHQFpIjBrVJxnlUClPgJl9FpuQ8EByKG20j1W+yiSi9SN+AwEIB/4HAwIz
O4Abf23wrvsEmBLXTUYAREPvKYZMd6UkdAS9+sToaSvqCMHdEHFyBeVSy6vN6Z7t
DhKiy59y5FdG3B5z6MwGvaP9mrZI5YTbPqR1wwnyiH4EGBYKACYWIQRWsV152uA6
EleJijGnjKlzS+stIwUCZOdq8gIbDAUJBaOagAAKCRCnjKlzS+stIxD7AP9Hlpay
FEQGlbEV7GYXn486FNh3KKXDXDIpeY3Z4c7B3wEApFzualxotmBHl+nyIbROZPbU
vfVTSKOdNXtK6bs7fgE=
=56q9
-----END PGP PRIVATE KEY BLOCK-----
`;
    const passphrase = `upwork`; // what the private key is encrypted with

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
    });
    // Read the CSV file
    const csvData = await fs.readFile('/Users/raymondjones/Downloads/myarchive/yourfile.csv', 'utf-8');

    // Encrypt the CSV data
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: csvData }),
        encryptionKeys: publicKey,
        signingKeys: privateKey
    });

    // Write the encrypted data to a new file
    await fs.writeFile('/Users/raymondjones/Downloads/myarchive/encrypted_file.pgp', encrypted);

    console.log('Encryption Complete');
})();
/*
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: 'Hello, World!' }), // input as Message object
        encryptionKeys: publicKey,
        signingKeys: privateKey // optional
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

    const message = await openpgp.readMessage({
        armoredMessage: encrypted // parse armored message
    });
    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        verificationKeys: publicKey, // optional
        decryptionKeys: privateKey
    });
    console.log(decrypted); // 'Hello, World!'
    // check signature validity (signed messages only)
    try {
        await signatures[0].verified; // throws on invalid signature
        console.log('Signature is valid');
    } catch (e) {
        throw new Error('Signature could not be verified: ' + e.message);
    }
})();
*/
/*
(async () => {
  const publicKeyArmored = `
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZOdq8hYJKwYBBAHaRw8BAQdAObs0ViGVOQnCJfAtqVdIJUfpZWBeT9qPMqmO
Uq8fNi20HFJheSA8cmF5am9uZXMyMTcwQGdtYWlsLmNvbT6ImQQTFgoAQRYhBFax
XXna4DoSV4mKMaeMqXNL6y0jBQJk52ryAhsDBQkFo5qABQsJCAcCAiICBhUKCQgL
AgQWAgMBAh4HAheAAAoJEKeMqXNL6y0j0f4A/RQPHyGX/el0kczPFHNQ4H60Req/
ydlo3hjDJ5PzcMK8AQD6V9jbgwEH0+QC7QxxxVgzBZaBWAEeQuAjVAQNK9yrCLg4
BGTnavISCisGAQQBl1UBBQEBB0BaSIwa1ScZ5VApT4CZfRabkPBAcihttI9Vvsok
ovUjfgMBCAeIfgQYFgoAJhYhBFaxXXna4DoSV4mKMaeMqXNL6y0jBQJk52ryAhsM
BQkFo5qAAAoJEKeMqXNL6y0jEPsA/0eWlrIURAaVsRXsZhefjzoU2HcopcNcMil5
jdnhzsHfAQCkXO5qXGi2YEeX6fIhtE5k9tS99VNIo501e0rpuzt+AQ==
=3VRT
-----END PGP PUBLIC KEY BLOCK-----
`;

  const filePath = './yourfile.csv';
  const outputFile = `${filePath}.pgp`;

  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const fileBuffer = fs.readFileSync(filePath);
  const message = await openpgp.createMessage({ binary: new Uint8Array([0x01, 0x01, 0x01]) });
  const encrypted = await openpgp.encrypt({
    message: message,
    passwords: ['secret stuff'],
    format: 'binary',
  });
  console.log(encrypted); // Uint8Array

  const encryptedMessage = await openpgp.readMessage({
      binaryMessage: encrypted // parse encrypted bytes
  });
  const { data: decrypted } = await openpgp.decrypt({
    message: encryptedMessage,
    passwords: ['secret stuff'], // decrypt with password
    format: 'binary' // output as Uint8Array
  });
  console.log(decrypted);

  fs.writeFileSync(outputFile, encrypted);
  console.log(`File encrypted and saved as ${outputFile}`);
})();
*/
/*
const fs = require('fs');
const openpgp = require('openpgp');

(async () => {
    const publicKeyArmored = `
    -----BEGIN PGP PUBLIC KEY BLOCK-----

    mDMEZOdq8hYJKwYBBAHaRw8BAQdAObs0ViGVOQnCJfAtqVdIJUfpZWBeT9qPMqmO
    Uq8fNi20HFJheSA8cmF5am9uZXMyMTcwQGdtYWlsLmNvbT6ImQQTFgoAQRYhBFax
    XXna4DoSV4mKMaeMqXNL6y0jBQJk52ryAhsDBQkFo5qABQsJCAcCAiICBhUKCQgL
    AgQWAgMBAh4HAheAAAoJEKeMqXNL6y0j0f4A/RQPHyGX/el0kczPFHNQ4H60Req/
    ydlo3hjDJ5PzcMK8AQD6V9jbgwEH0+QC7QxxxVgzBZaBWAEeQuAjVAQNK9yrCLg4
    BGTnavISCisGAQQBl1UBBQEBB0BaSIwa1ScZ5VApT4CZfRabkPBAcihttI9Vvsok
    ovUjfgMBCAeIfgQYFgoAJhYhBFaxXXna4DoSV4mKMaeMqXNL6y0jBQJk52ryAhsM
    BQkFo5qAAAoJEKeMqXNL6y0jEPsA/0eWlrIURAaVsRXsZhefjzoU2HcopcNcMil5
    jdnhzsHfAQCkXO5qXGi2YEeX6fIhtE5k9tS99VNIo501e0rpuzt+AQ==
    =3VRT
    -----END PGP PUBLIC KEY BLOCK-----
    `;

  const privateKeyArmored = `
  -----BEGIN PGP PRIVATE KEY BLOCK-----

  lIYEZOdq8hYJKwYBBAHaRw8BAQdAObs0ViGVOQnCJfAtqVdIJUfpZWBeT9qPMqmO
  Uq8fNi3+BwMC3W96HJCyGc/7lYf1u1PmnS1/O9uYoc+LlFqMheQoqZsmgDxERS/U
  MhJu5GSAWosjA7TIuNy2ZdpH29SRQnvXAnHkV5K418TjviR+UBPJ9bQcUmF5IDxy
  YXlqb25lczIxNzBAZ21haWwuY29tPoiZBBMWCgBBFiEEVrFdedrgOhJXiYoxp4yp
  c0vrLSMFAmTnavICGwMFCQWjmoAFCwkIBwICIgIGFQoJCAsCBBYCAwECHgcCF4AA
  CgkQp4ypc0vrLSPR/gD9FA8fIZf96XSRzM8Uc1DgfrRF6r/J2WjeGMMnk/NwwrwB
  APpX2NuDAQfT5ALtDHHFWDMFloFYAR5C4CNUBA0r3KsInIsEZOdq8hIKKwYBBAGX
  VQEFAQEHQFpIjBrVJxnlUClPgJl9FpuQ8EByKG20j1W+yiSi9SN+AwEIB/4HAwIz
  O4Abf23wrvsEmBLXTUYAREPvKYZMd6UkdAS9+sToaSvqCMHdEHFyBeVSy6vN6Z7t
  DhKiy59y5FdG3B5z6MwGvaP9mrZI5YTbPqR1wwnyiH4EGBYKACYWIQRWsV152uA6
  EleJijGnjKlzS+stIwUCZOdq8gIbDAUJBaOagAAKCRCnjKlzS+stIxD7AP9Hlpay
  FEQGlbEV7GYXn486FNh3KKXDXDIpeY3Z4c7B3wEApFzualxotmBHl+nyIbROZPbU
  vfVTSKOdNXtK6bs7fgE=
  =56q9
  -----END PGP PRIVATE KEY BLOCK-----
  `;


  const passphrase = `upwork`; // Replace with the passphrase for the private key

  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });

  const filePath = './yourfile.csv';
  const encryptedFile = `${filePath}.pgp`;
  const decryptedFile = './decrypted.csv';

  // Read the CSV file as a string
  const fileText = fs.readFileSync(filePath, 'utf-8');

  // Encrypt the CSV file
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: fileText }),
    encryptionKeys: publicKey,
    signingKeys: privateKey // optional
  });

  // Save the encrypted content
  fs.writeFileSync(encryptedFile, encrypted);
  console.log(`File encrypted and saved as ${encryptedFile}`);

  // Decrypt the CSV file
  const encryptedText = fs.readFileSync(encryptedFile, 'utf-8');
  const message = await openpgp.readMessage({ armoredMessage: encryptedText });

  const { data: decrypted, signatures } = await openpgp.decrypt({
    message,
    verificationKeys: publicKey, // optional
    decryptionKeys: privateKey
  });

  // Save the decrypted content
  fs.writeFileSync(decryptedFile, decrypted);
  console.log(`File decrypted and saved as ${decryptedFile}`);

  // Check signature validity (optional)
  try {
    await signatures[0].verified; // throws on invalid signature
    console.log('Signature is valid');
  } catch (e) {
    throw new Error('Signature could not be verified: ' + e.message);
  }

})();
*/



