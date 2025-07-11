// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToWhatsApp } = require("./whatsapp");

const app = express();
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("OLAMYKXVBOT Backend is running ✅");
});

// Start WhatsApp Bot
connectToWhatsApp();

// Launch server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OLAMYKXVBOT running on http://localhost:${PORT}`);
});
