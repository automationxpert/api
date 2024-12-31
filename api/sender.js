// api/webhook.js

import axios from 'axios';

export default async function handler(req, res) {
    // Only process POST requests
    if (req.method === 'POST') {
        try {
            const payload = req.body;

            // Send the payload to another webhook using axios
            const response = await axios.post('https://web-hooks.netlify.app/.netlify/functions/get', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the forwarding request was successful
            if (response.status === 200) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ success: false, message: 'Failed to forward webhook' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
