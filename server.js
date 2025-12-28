const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),// 587 (number, not string)
  secure: false,                      // STARTTLS
  requireTLS: true,                   // 👈 MANDATORY
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false         // 👈 Render fix
  }
});

app.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: "Ankit Portfolio <ankit8288ya@gmail.com>", // 👈 VERIFIED EMAIL
      to: "ankit8288ya@gmail.com",
      subject: "Brevo SMTP Test",
      text: "Brevo SMTP is finally working 🚀"
    });
    res.send("Mail sent");
  } catch (err) {
    console.error(err);
    res.send("Mail failed");
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: "Ankit Portfolio <ankit8288ya@gmail.com>",
      replyTo: email,
      to: "ankit8288ya@gmail.com",
      subject: "New Message from Portfolio Website",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
