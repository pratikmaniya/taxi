const fs = require('fs');
const nodemailer = require('nodemailer');

const config = require('./config')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword
    }
});

class Mailer {
    async sendForgotPasswordMail(toMail, link) {
        try {
            await fs.readFile(__dirname + '/mailTemplates/forgotPasswordLinkTemplate.html', 'utf8', function (err, file) {
                if (err) {
                    console.log('ERROR -> read forgotPasswordLinkTemplate.html  file !', err);
                    throw err
                } else {
                    let subject = `Loggy - Message`,
                        message
                    message = file;
                    message = message.replace("@@IMAGE_LOGO@@", config.colorLogoLink);
                    message = message.replace("@@LINK@@", link);
                    let mailOptions = {
                        from: config.mailerEmail,
                        to: toMail,
                        subject: subject,
                        html: message
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            throw error
                        } else {
                            console.log('Email sent: ' + JSON.stringify(info));
                        }
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Mailer()

