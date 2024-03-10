
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

export default sendVerificationEmail;