# PlanClix Contact Service

This repository contains a simple contact form (client) and a minimal Node.js backend to forward messages by email.

Quick start

1. Copy the example env file and edit it with your SMTP credentials and desired recipient:

```bash
cp .env.example .env
# edit .env and set SMTP_HOST, SMTP_USER, SMTP_PASS, RECIPIENT_EMAIL
```

2. Install dependencies and start the server:

```bash
npm install
npm start
```

3. Open `http://localhost:3000` and use the contact form. The client posts to `/api/contact`.

Notes
- Use a transactional email provider (SendGrid, Mailgun, or your SMTP host).
- For production, run behind a proper process manager and secure environment variables.
