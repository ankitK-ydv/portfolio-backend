const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: "Portfolio Contact <no-reply@portfolio.com>",
      to: "ankit8288ya@gmail.com",
      replyTo: email,
      subject: "New Message from Portfolio Website",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false });
  }
});

app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: "Portfolio Test <no-reply@portfolio.com>",
      to: "ankit8288ya@gmail.com",
      subject: "Brevo SMTP Test",
      text: "Brevo SMTP is working successfully"
    });

    res.send("Mail sent");
  } catch (e) {
    console.error(e);
    res.send("Mail failed");
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
