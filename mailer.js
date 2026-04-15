const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = async (data) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New Booking Request from ${data.firstName} ${data.lastName}`,
    text: `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nService Type: ${data.serviceType}\nPreferred Date: ${data.preferredDate}\nProject Details: ${data.projectDetails}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
