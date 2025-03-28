const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const DES_ALGORITHM = "des-ede3";

function deriveKeyFromString(secret) {
  return crypto.createHash("sha256").update(secret).digest(); // 32-byte key
}

const encryptWith3DES = asyncHandler(async (req, res) => {
  const { message, secret } = req.body;

  if (!message || !secret) {
    res.status(400);
    throw new Error("Both message and secret are required");
  }

  const key = deriveKeyFromString(secret).subarray(0, 24);
  const cipher = crypto.createCipheriv(DES_ALGORITHM, key, null);

  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");

  res.status(200).json({
    encryptedMessage: encrypted,
  });
});



const decryptWith3DES = asyncHandler(async (req, res) => {
  const { message, secret } = req.body;

  if (!message || !secret) {
    res.status(400);
    throw new Error("Both message and secret are required");
  }

  const key = deriveKeyFromString(secret).subarray(0, 24);
  const decipher = crypto.createDecipheriv(DES_ALGORITHM, key, null);
  let decrypted = decipher.update(message, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  res.status(200).json({
    decryptedMessage: decrypted,
  });
});

module.exports = { encryptWith3DES, decryptWith3DES };
