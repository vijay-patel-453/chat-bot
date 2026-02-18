const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const chatHandler = require("./chat");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_DIR = path.join(__dirname, "users");

if (!fs.existsSync(USERS_DIR)) {
  fs.mkdirSync(USERS_DIR);
}

app.post("/api/auth/register", (req, res) => {
  const { fullName, email, password } = req.body;
  const filePath = path.join(USERS_DIR, `${email}.json`);

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ message: "User already registered!" });
  }

  const userData = { fullName, email, password };

  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

  res.status(201).json({ message: "User file created successfully" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const filePath = path.join(USERS_DIR, `${email}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(401).json({ message: "User not found" });
  }

  // Read the user file
  const fileData = fs.readFileSync(filePath);
  const user = JSON.parse(fileData);

  if (user.password === password) {
    res.json({ message: "Success", user: { name: user.fullName } });
  } else {
    res.status(401).json({ message: "Incorrect password" });
  }
});

app.post("/api/chat", chatHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
