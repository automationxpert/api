const axios = require('axios');

exports.handler = async (event, context) => {
    const payload = JSON.parse(event.body);

    try {
        const response = await axios.post('https://another-webhook-url.com', payload);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: response.data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message }),
        };
    }
};
