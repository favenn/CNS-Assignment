const express = require("express");
const router = express.Router();
const {
  encryptWith3DES,
  decryptWith3DES,
} = require("../controllers/3DEScontroller");

router.route("/encrypt").post(encryptWith3DES);
router.route("/decrypt").post(decryptWith3DES);

module.exports = router;
