exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        // Parse the webhook payload
        const payload = JSON.parse(event.body);

        // Log or process the webhook data
        console.log("Webhook received:", payload);

        // Respond to the webhook sender
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Webhook processed successfully' }),
        };
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};
