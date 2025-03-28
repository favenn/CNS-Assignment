const express = require("express")
const { encryptWithOTP, decryptWithOTP } = require("../controllers/OTPcontroller")
const router = express.Router()

router.route("/encrypt").post(encryptWithOTP)
router.route("/decrypt").post(decryptWithOTP)

module.exports = router