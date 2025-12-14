const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

console.log("Server file started");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/nameDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// Schema
const nameSchema = new mongoose.Schema({
  name: String
});

const Name = mongoose.model("Name", nameSchema);

// Route test
app.get("/", (req, res) => {
  res.send("Server is working 👍");
});

// Form submit
app.post("/submit", async (req, res) => {
  const newName = new Name({
    name: req.body.name
  });
  await newName.save();
  res.send("Name saved successfully 👍");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
