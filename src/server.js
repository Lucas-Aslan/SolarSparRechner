// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/submitForm', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    referralCode,
    selectedServices,
    street,
    houseNumber,
    postalCode,
    city,
  } = req.body;

  const mailText = `
    Neue Anfrage:
    Vorname: ${firstName}
    Nachname: ${lastName}
    E-Mail: ${email}
    Telefon: ${phone}
    Empfehlungscode: ${referralCode || '-Kein Code-'}
    Services: ${selectedServices ? selectedServices.join(', ') : 'Keine Angabe'}
    Adresse: ${street} ${houseNumber}, ${postalCode} ${city}
  `;

  try {
    // 1) Transporter: Port 465, secure = true
    const transporter = nodemailer.createTransport({
      host: 'smtp.strato.de',
      port: 587,
      secure: false, // Port 465 -> SSL
      auth: {
        user: process.env.MAIL_USER, // z.B. info@deinedomain.de
        pass: process.env.MAIL_PASS  // Dein Mail-Passwort bei Strato
      },
      // Optional: Manchmal hilft rejectUnauthorized: false,
      // falls es ein Zertifikats-Problem gibt.
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true
    });

    // 2) Absender/Empfänger
    const mailOptions = {
      from: process.env.MAIL_USER, 
      to: process.env.MAIL_TO,
      subject: 'Neue Anfrage über das Formular',
      text: mailText,
    };

    // 3) E-Mail senden
    await transporter.sendMail(mailOptions);

    console.log('E-Mail erfolgreich gesendet an:', mailOptions.to);
    return res.status(200).json({ message: 'E-Mail erfolgreich gesendet!' });
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return res.status(500).json({ message: 'Fehler beim Senden der E-Mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
