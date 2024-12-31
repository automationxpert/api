exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const payload = JSON.parse(event.body);
        console.log("Webhook received:", payload);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Webhook processed' }),
        };
    }
    return { statusCode: 405, body: 'Method Not Allowed' };
};
