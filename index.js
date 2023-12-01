// server/index.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to my forma');
});

app.post('/api/forma', (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: '.......in',
            pass: '......',
        },
    });

    let mailOptions = {
        from: data.email,
        to: '...........in',
        subject: `Message from ${data.name}`,
        html: `
            <h3>Information</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${data.message}</p>
        `,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            res.json({ message: 'Email sent successfully' });
        }
        smtpTransport.close();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
