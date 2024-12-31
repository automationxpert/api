const fetch = require('node-fetch'); // Import fetch for HTTP requests

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            // Parse the incoming webhook payload
            const incomingPayload = JSON.parse(event.body);
            console.log("Received payload:", incomingPayload);

            // Forward the payload to another webhook
            const targetWebhookUrl = "https://discord.com/api/webhooks/1282365576840220784/ZFqVqq9edpkNeQthD8lUw-D3uPviFbBnOtIqtBOU12acFRZMWV2uvgOK7GCSJfqX-3EU"; // Replace with your target URL
            const response = await fetch(targetWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(incomingPayload),
            });

            // Log and check the response from the forwarded webhook
            if (response.ok) {
                console.log("Forwarded successfully:", await response.json());
            } else {
                console.error("Failed to forward:", response.status, await response.text());
            }

            // Respond to the original sender
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Webhook received and forwarded successfully" }),
            };
        } catch (error) {
            console.error("Error handling webhook:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Internal Server Error" }),
            };
        }
    }

    // Method not allowed for non-POST requests
    return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
    };
};
