const mockMessages = require("./data/mockMessages.json");

const chatHandler = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "I didn't receive a message." });
  }

  const keyword = message.toLowerCase().trim();

  // Logical lookup: priority match -> fallback to default
  const reply = mockMessages[keyword] || mockMessages.default;

  res.json({ reply });
};

module.exports = chatHandler;
