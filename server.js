require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configure transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).send('Missing required fields');

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
    subject: `PlanClix Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).send('Failed to send email');
  }
});

// Optional: serve static files when running server for development
app.use(express.static('.'));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
