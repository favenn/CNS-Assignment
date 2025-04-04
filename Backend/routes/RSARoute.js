const express = require("express");
const router = express.Router();
const {
  encryptWithRSA,
  decryptWithRSA,
} = require("../controllers/RSAController");

router.route("/encrypt").post(encryptWithRSA);
router.route("/decrypt").post(decryptWithRSA);

module.exports = router;
