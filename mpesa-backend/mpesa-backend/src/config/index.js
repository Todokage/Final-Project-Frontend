import dotenv from 'dotenv';

dotenv.config();

const config = {
  mpesa: {
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    shortcode: process.env.MPESA_SHORTCODE,
    lipaNaMpesaOnlineUrl: process.env.MPESA_LIPA_NA_MPESA_ONLINE_URL,
    // Add other MPESA related configurations as needed
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // Add other email related configurations as needed
  },
  // Add any other application-wide configurations here
};

export default config;