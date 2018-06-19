const mailer = require('nodemailer');
const config = require('../config');
const transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth:{
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
});

exports.sendMail = (req, res)=>{
    if(!req.body.email || req.body.email === ''){
        res.status(400).json({message: 'Unable to send email. You must enter an email.'});
    }
    if(!req.body.subject || req.body.subject === ''){
        res.status(400).json({message: 'Unable to send email. You must enter an email subject.'});
    }
    if(!req.body.firstName || req.body.firstName === ''){
        res.status(400).json({message: 'Unable to send email. You must enter your first name.'});
    }
    if(!req.body.lastName || req.body.lastName === ''){
        res.status(400).json({message: 'Unable to send email. You must enter your last name.'});
    }
    if(!req.body.emailMessage || req.body.emailMessage === ''){
        res.status(400).json({message: 'Unable to send email. You must enter an email message.'});
    }
    let mailOptions = {
        from:'anthony.emailer@gmail.com',
        to: 'anthony.emailer@gmail.com',
        subject: req.body.subject,
        html: `<h3>Car Wash App - Email</h3>
            <h4>Sent From: ${req.body.firstName} ${req.body.lastName} [${req.body.email}]</h4>
            <p><strong>Message:</strong></p>
            <p>${req.body.emailMessage}</p>
        `
    }
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            res.status(500).json({message: `Unable to send email. ${err.message}`});
        }else{
            res.status(200).json({message: `Email sent! ${info.response}`});
        }
    });
}