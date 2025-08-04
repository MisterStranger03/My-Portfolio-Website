// Add this line at the very top to load variables from .env file for local development
require('dotenv').config();

const nodemailer = require('nodemailer');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { name, email, message } = req.body;

  // process.env will use your .env file locally, and Vercel's variables in production
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.GMAIL_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `<p>You have a new submission:</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email.' });
    }
    return res.status(200).json({ message: 'Message sent successfully!' });
  });
}