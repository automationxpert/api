const axios = require('axios');

exports.handler = async (event, context) => {
    const payload = JSON.parse(event.body);

    try {
        const response = await axios.post('https://discord.com/api/webhooks/1323687563248009226/sZDN9PChdbnvo2UFmxFYue1TRgw47nGypoz1e33vAOurkL9pVmll5twLm5Xa1OJnvenJ', payload);
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
