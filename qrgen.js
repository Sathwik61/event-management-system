const qrcode = require('qrcode');
const fs = require('fs');
async function generateQRCode(uniqueId, format = 'png') {
    try {
      const qrCodeData = uniqueId;
      const qrCodeBuffer = await qrcode.toBuffer(qrCodeData, { format });
      const filePath = `public/qrcodes/${uniqueId}_scannable.${format}`;
      const pf=`public/qrcodes/${uniqueId}_scannable.${format}`
      fs.writeFileSync(filePath, qrCodeBuffer);
      console.log(`Scannable QR code image saved at: ${filePath}`);
      return pf; // Return the file path if needed
      console.log(pf)
    } catch (error) {
      console.error('Error generating scannable QR code:', error);
      return null;
    }
  }
  
  module.exports = generateQRCode;
  