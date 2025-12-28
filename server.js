const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Ankit Portfolio",
          email: "ankit8288ya@gmail.com"
        },
        to: [
          {
            email: "ankit8288ya@gmail.com",
            name: "Ankit"
          }
        ],
        replyTo: {
          email: email,
          name: name
        },
        subject: "New Message from Portfolio Website",
        textContent: `
Name: ${name}
Email: ${email}
Message: ${message}
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          "accept": "application/json"
        }
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("BREVO API ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
