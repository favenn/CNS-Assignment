const asyncHandler = require("express-async-handler");

const encryptWithRSA = asyncHandler(async (req, res) => {
    const { plaintext, public_key } = req.body;
    try {
        const publicKey = forge.pki.publicKeyFromPem(public_key);
        const encrypted = publicKey.encrypt(plaintext, "RSA-OAEP", {
          md: forge.md.sha256.create(),
        });
      res.json({ encrypted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

const decryptWithRSA = asyncHandler(async (req, res) => {
    const { encrypted, private_key } = req.body;
    try {
        const privateKey = forge.pki.privateKeyFromPem(private_key);
        const encryptedBytes = forge.util.decode64(encrypted);
        const decrypted = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
          md: forge.md.sha256.create(),
        });
      res.json({ decrypted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = { encryptWithRSA, decryptWithRSA };
