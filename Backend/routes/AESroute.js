const express = require("express");
const router = express.Router();
const {
  encryptWithAES,
  decryptWithAES,
} = require("../controllers/AEScontroller");

router.route("/encrypt").post(encryptWithAES);
router.route("/decrypt").post(decryptWithAES);

module.exports = router;
