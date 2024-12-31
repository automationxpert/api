const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      // Parse the webhook payload
      const payload = JSON.parse(event.body);

      // Log the received webhook data
      console.log("Webhook received:", payload);

      // 1. Post the received message to another webhook
      const anotherWebhookUrl = process.env.ANOTHER_WEBHOOK_URL; 

      if (!anotherWebhookUrl) {
        console.error("Missing environment variable: ANOTHER_WEBHOOK_URL");
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Missing ANOTHER_WEBHOOK_URL environment variable" }),
        };
      }

      const anotherWebhookOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const anotherWebhookData = JSON.stringify(payload); 

      await new Promise((resolve, reject) => {
        const req = https.request(anotherWebhookUrl, anotherWebhookOptions, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(data);
            } else {
              reject(new Error(`Failed to post to another webhook: ${res.statusCode}`));
            }
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.write(anotherWebhookData);
        req.end();
      });

      // Respond to the webhook sender
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Webhook processed successfully' }),
      };

    } catch (error) {
      console.error('Error processing webhook:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
