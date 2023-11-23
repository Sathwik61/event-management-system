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
    // text: 'Find your QR code attached.',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invitation to College Event</title>
      <style>
        body {
          font-family: sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f2f2f2;
        }

        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        header {
          text-align: center;
          background-color: #007bff;
          color: #fff;
          padding: 20px;
        }

        h1 {
          font-size: 24px;
          margin: 0;
        }

        p {
          font-size: 16px;
          line-height: 1.5;
        }

        .call-to-action {
          text-align: center;
          margin-top: 20px;
        }

        .call-to-action a {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }

        .special-note {
          background-color: #f2f2f2;
          padding: 10px;
          border-radius: 5px;
          margin-top: 20px;
          text-align: center;
        }

        .special-note span {
          color: #e74c3c;
          font-weight: bold;
        }

        footer {
          text-align: center;
          margin-top: 20px;
          padding: 20px;
          background-color: #f2f2f2;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Warm Greetings!</h1>
        </header>

        

        <p>We are thrilled to invite you to our upcoming college event! Your presence will make it a truly special occasion, and we can't wait to share this experience with you.</p>

        

        <p>Attached is your personalized QR code for easy check-in at the event. Make sure to bring it with you for smooth entry.</p>

        <p>If you have any questions or need further information, feel free to contact us at info@sode-edu.in.</p>

        <p>We look forward to seeing you at the event!</p>

        <div class="special-note">
          <p style="font-weight: bold;">Special Note:</p>
          <p>To attend the event <span style="color: #e74c3c;">QR code </span> that is sent to you is mandatory.</p>
        </div>

        <p>Best regards,</p>
        <p>SMVITM Events Team</p>
      </div>
    </body>
    </html>
  `,
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