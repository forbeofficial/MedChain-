const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
