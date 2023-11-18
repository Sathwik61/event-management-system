const nodemailer = require('nodemailer');

// Function to send an email with an attached QR code
const sendEmailWithQRCode = async (recipientEmail, qrCodeUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ubuntu6360@gmail.com', // Replace with your Gmail address
      pass: 'rpjcrhzhkpqmespj' // Replace with your Gmail app password
    }
  });

  const mailOptions = {
    from: 'ubuntu6360@gmail.com',
    to: recipientEmail,
    subject: 'QR Code Attached',
    text: 'Find your QR code attached.',
    attachments: [
      {
        filename: 'qrCode.png',
        path: qrCodeUrl, // Use the URL directly
        cid: 'qrCode@unique.com' // Content ID to reference the image in the email body
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports=sendEmailWithQRCode;