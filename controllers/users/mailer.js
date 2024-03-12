
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (recipientEmail, verificationToken) => {
  const verificationLink = `http://localhost/verify/${verificationToken}`;

  const mailOptions = {
    from: "moniamber@gmail.com",
    to: recipientEmail,
    subject: "Potwierdzenie rejestracji",
    html: `<p>Kliknij <a href="${verificationLink}">tutaj</a> aby zweryfikować swój adres e-mail.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("E-mail wysłany: " + info.response);
    }
  });
};
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'moniamber@gmail.com.com', 
  from: 'monika.gellert@wp.pl',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  

export default sendVerificationEmail;
  }