const nodemailer = require('nodemailer');
const cors = require('cors');

function configureEmail (email, password) {
    const contactEmail = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: email,
          pass: password,
        },
    });
    
    /*contactEmail.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Ready to Send");
        }
    });*/

    return contactEmail
}

module.exports = { configureEmail : configureEmail }