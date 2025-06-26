# MPESA Backend Integration

This project is a backend application that integrates with the MPESA API DARAJA to enable receiving STK push notifications to a mobile phone number and sending feedback via email.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd mpesa-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables as specified in the `.env.example` file.

## Usage

To start the application, run:
```
npm start
```

The server will start on the specified port (default is 3000).

## API Endpoints

- **MPESA**
  - `POST /api/mpesa/stkpush` - Initiates an STK push to a mobile number.
  - `POST /api/mpesa/notification` - Receives STK push notifications from MPESA.

- **Email**
  - `POST /api/email/send` - Sends feedback emails to users.

## Environment Variables

The following environment variables are required:

- `MPESA_CONSUMER_KEY` - Your MPESA API consumer key.
- `MPESA_CONSUMER_SECRET` - Your MPESA API consumer secret.
- `MPESA_SHORTCODE` - Your MPESA shortcode.
- `MPESA_LIVE_URL` - The live URL for the MPESA API.
- `EMAIL_SERVICE` - The email service provider (e.g., Gmail, SendGrid).
- `EMAIL_USER` - Your email address for sending feedback.
- `EMAIL_PASS` - Your email password or API key.

## License

This project is licensed under the MIT License.