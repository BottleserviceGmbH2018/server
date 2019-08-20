const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const app = express();

const log = console.log;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/api/form', (req, res) => {
    console.log(req.body)
    // Step 1
let transporter = nodemailer.createTransport({
    host: 'server41.hostfactory.ch',
    port: 465,
    secure: true,
    auth: {
        user: 'chris.gacu@digitalmediafactory.ch', // TODO: your gmail account
        pass: 'Chris2594!' // TODO: your gmail password
    }
});

const handlebarOptions = {
  viewEngine: {
        partialsDir: 'src/server/views/',
        layoutsDir: 'src/server/views/',
        defaultLayout: 'index.handlebars',
    },
    viewPath: 'src/server/views/',
    extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));

// Step 2
let mailOptions = {
    from: 'info@intermedify.com', // TODO: email sender
    to: 'chris18kzone@gmail.com', // TODO: email receiver
    subject: 'Welcome to Ifanga!',
    template: 'index'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs', err);
    }
    return log('Email sent!!!');
});

})


const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', (err) => {
    console.log(`Server listening on port ${PORT}`)
});


