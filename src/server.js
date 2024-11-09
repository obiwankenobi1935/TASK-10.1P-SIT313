require('dotenv').config();
const express = require('express');
const axios = require('axios');
const stripe = require('stripe')('sk_test_51QFipqC5WzPzDwzD9rccO29Zyxatk1Wb3gcwm2NjQTAXCQktsijWPqkJAFp7eMdi6fQgzikoujATdpM0n0U5HpBk00tRHMXFYl'); // Replace with your Stripe secret key
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Brevo email sending route
app.post('/hello', async (req, res) => {
  const { email } = req.body;

  const emailData = {
    sender: { email: 'kavish4787.be23@chitkara.edu.in' },  // Replace with your verified Brevo email
    to: [{ email: email }],  // Recipient email
    subject: 'Welcome to DEV@Deakin Newsletter!',
    htmlContent: '<html><body><h3>Thank you for subscribing to the DEV@Deakin newsletter!</h3></body></html>',
  };

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', emailData, {
      headers: {
        'api-key': process.env.BREVO_SECRET_KEY,  // Your Brevo API key
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      res.status(200).send({ message: 'Welcome email sent successfully!' });
    } else {
      res.status(500).send({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

// Stripe checkout session route
app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', // or 'payment' for one-time payments
      line_items: [
        {
          price: priceId, // Your Stripe Price ID for the subscription
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5000/success', // Redirect URL on success
      cancel_url: 'http://localhost:5000/',   // Redirect URL on cancel
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
