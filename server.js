// server.js
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Endpoint for verifying phone number
app.post("/api/verify", (req, res) => {
  const { phone } = req.body;

  // Read the JSON file
  fs.readFile("paymentData.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading paymentData.json:", err);
      return res.status(500).json({ message: "Server error" });
    }

    const paymentData = JSON.parse(data);
    const isPaid = paymentData.payments.some(entry => entry.phone === phone);

    if (isPaid) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
