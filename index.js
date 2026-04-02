// telegram-server.js
import express, { json } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.post('/telegram-webhook', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    
    const telegramMessage = `
🎯 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
🔧 Service: ${service}
💬 Message: ${message}

⏰ Time: ${new Date().toLocaleString()}
🌐 Website: XColor AI
`;
    
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage
        })
      }
    );
    
    if (response.ok) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Telegram API failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;