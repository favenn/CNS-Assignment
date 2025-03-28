const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const AES_ALGORITHM = "aes-256-cbc";

function deriveKeyFromString(secret) {
  return crypto.createHash("sha256").update(secret).digest(); // 32-byte key
}

const encryptWithAES = asyncHandler(async (req, res) => {
  const { message, secret } = req.body;

  if (!message || !secret) {
    res.status(400);
    throw new Error("Both message and secret are required");
  }

  const key = deriveKeyFromString(secret);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(AES_ALGORITHM, key, iv);
  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");
  const result = iv.toString("hex") + ":" + encrypted;

  res.status(200).json({
    encryptedMessage: result,
  });
});

const decryptWithAES = asyncHandler(async (req, res) => {
  const { message, secret } = req.body;

  if (!message || !secret) {
    res.status(400);
    throw new Error("Both message and secret are required");
  }

  const key = deriveKeyFromString(secret);
  const parts = message.split(":");
  if (parts.length !== 2) throw new Error("Invalid encrypted format");

  const iv = Buffer.from(parts[0], "hex");
  const encryptedData = parts[1];

  const decipher = crypto.createDecipheriv(AES_ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  res.status(200).json({
    decryptedMessage: decrypted,
  });
});

module.exports = { encryptWithAES, decryptWithAES };
