const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/3des", require("./routes/3DESroute"));
app.use("/api/aes", require("./routes/AESroute"));
app.use("/api/otp", require("./routes/OTProute"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server has started on port", PORT);
});
