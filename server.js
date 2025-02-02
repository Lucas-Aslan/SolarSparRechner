const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 587,
    secure: false,
    auth: {
        user: 'info@solarrex.de',
        pass: 'Solarrex2024!',
    },
});

const EXCEL_FILE = 'leads.xlsx';

/**
 * @param {Object} leadData
 * @param {string} formType
 */
async function addLeadToExcel(leadData, formType) {
    let workbook;
    const fileExists = fs.existsSync(EXCEL_FILE);

    if (fileExists) {
        workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_FILE);
    } else {
        workbook = new ExcelJS.Workbook();
        workbook.creator = 'Solarrex Server';
        workbook.created = new Date();
    }

    let worksheet = workbook.getWorksheet('Leads');
    if (!worksheet) {
        worksheet = workbook.addWorksheet('Leads');
        worksheet.columns = [
            { header: 'FormType', key: 'formType', width: 10 },
            { header: 'Vorname', key: 'firstName', width: 15 },
            { header: 'Nachname', key: 'lastName', width: 15 },
            { header: 'FullName', key: 'fullName', width: 25 },
            { header: 'PLZ', key: 'plz', width: 10 },
            { header: 'Strom', key: 'stromverbrauch', width: 15 },
            { header: 'Dachtyp', key: 'dachtyp', width: 15 },
            { header: 'PKW', key: 'pkw', width: 10 },
            { header: 'E-Mail', key: 'email', width: 35 },
            { header: 'Phone', key: 'phone', width: 20 },
            { header: 'PhoneNum', key: 'phoneNumber', width: 20 },
            { header: 'Street', key: 'street', width: 20 },
            { header: 'HausNr', key: 'houseNumber', width: 10 },
            { header: 'PostalCode', key: 'postalCode', width: 10 },
            { header: 'City', key: 'city', width: 15 },
            { header: 'Timestamp', key: 'createdAt', width: 25 },
        ];
    }

    worksheet.addRow({
        formType,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        fullName: leadData.fullName,
        plz: leadData.plz,
        stromverbrauch: leadData.stromverbrauch,
        dachtyp: leadData.dachtyp,
        pkw: leadData.pkw,
        email: leadData.email,
        phone: leadData.phone,
        phoneNumber: leadData.phoneNumber,
        street: leadData.street,
        houseNumber: leadData.houseNumber,
        postalCode: leadData.postalCode,
        city: leadData.city,
        createdAt: new Date().toLocaleString(),
    });

    await workbook.xlsx.writeFile(EXCEL_FILE);
    console.log(`Lead von "${formType}" in ${EXCEL_FILE} gespeichert.`);
}

app.post('/api/submitForm', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        referralCode,
        selectedServices = [],
        street,
        houseNumber,
        postalCode,
        city,
    } = req.body;

    const mailOptions = {
        from: '"Solarrex Test" <info@solarrex.de>',
        to: 'info@solarrex.de',
        subject: 'Neue Anfrage fuer ein PV-Angebot',
        text: `
            Name: ${firstName} ${lastName}
            E-Mail: ${email}
            Telefon: ${phone}
            Empfehlungscode: ${referralCode || 'Keiner'}
            Services: ${Array.isArray(selectedServices) ? selectedServices.join(', ') : 'Keine'}
            Adresse: ${street} ${houseNumber}, ${postalCode} ${city}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        const leadData = {
            firstName,
            lastName,
            email,
            phone,
            street,
            houseNumber,
            postalCode,
            city,
        };
        await addLeadToExcel(leadData, 'Form');
        res.status(200).json({ message: 'Formular erfolgreich versendet.' });
    } catch (error) {
        console.error('Fehler beim Versenden der E-Mail:', error);
        res.status(500).json({ message: 'Fehler beim Versenden der E-Mail.' });
    }
});

app.post('/api/submitFunnel', async (req, res) => {
    console.log('req.body', req.body);
    const {
        fullName,
        plz,
        stromverbrauch,
        dachtyp,
        pkw,
        email,
        phoneNumber,
    } = req.body;

    const mailOptions = {
        from: '"Solarrex Funnel" <info@solarrex.de>',
        to: 'info@solarrex.de',
        subject: 'Neue Anfrage (SparRechner)',
        text: `
            Name: ${fullName}
            PLZ: ${plz}
            Stromverbrauch: ${stromverbrauch || 'k.A.'}
            Dachtyp: ${dachtyp || 'k.A.'}
            PKW-Fahrleistung: ${pkw || 'k.A.'}
            E-Mail: ${email}
            Telefon: ${phoneNumber}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        const leadData = {
            fullName,
            plz,
            stromverbrauch,
            dachtyp,
            pkw,
            email,
            phoneNumber,
        };
        await addLeadToExcel(leadData, 'Funnel');
        res.status(200).json({ message: 'Funnel erfolgreich versendet.' });
    } catch (error) {
        console.error('Fehler beim Versenden der E-Mail:', error);
        res.status(500).json({ message: 'Fehler beim Versenden der E-Mail.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server laeuft auf http://localhost:${PORT}`);
});
