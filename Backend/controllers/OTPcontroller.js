const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const xorLetters = (char1, char2) => {
  return String.fromCharCode(char1.charCodeAt(0) ^ char2.charCodeAt(0));;
};

const xorTwowords = (text1, text2) => {
  let arr = text1.split("");
  return arr.map((char, i) => xorLetters(char, text2[i])).join("");
};

const encryptWithOTP = asyncHandler(async (req, res) => {
  const { message, secret } = req.body;

  if (!message || !secret) {
    res.status(400);
    throw new Error("Both message and secret are required");
  }

  if (message.length != secret.length) {
    res.status(400);
    throw new Error("message and secret have to be of the same length");
  }

  const result = xorTwowords(message, secret);

  res.status(200).json({
    encryptedMessage: result,
  });
});

const decryptWithOTP = asyncHandler(async (req, res) => {
  const { message, secret } = req.body;

  if (!message || !secret) {
    res.status(400);
    throw new Error("Both message and secret are required");
  }

  if (message.length != secret.length) {
    res.status(400);
    throw new Error("message and secret have to be of the same length");
  }

  const decrypted = xorTwowords(message, secret);

  res.status(200).json({
    decryptedMessage: decrypted,
  });
});

module.exports = { encryptWithOTP, decryptWithOTP };
