// api/send-email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_USER,            // your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD,    // 16-char App Password
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required." });
    }

    if (req.body.hp) {
      // probable bot
      return res.status(200).json({ message: "Thanks!" }); 
    }

    // Build the mail
    const mailOptions = {
      from: process.env.GMAIL_USER,         
      to: process.env.RECEIVER_EMAIL,       
      subject: `Contact form: ${name}`,
      replyTo: email,                       
      text: `You received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent" });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}

// small helper: escape to avoid injection in HTML email
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}