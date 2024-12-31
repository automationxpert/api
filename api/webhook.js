export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Parse the webhook payload
        const payload = req.body;

        // Log or process the webhook data
        console.log('Webhook received:', payload);

        // Respond to the webhook sender
        res.status(200).json({ message: 'Webhook received successfully' });
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
