import axios from 'axios';
import { MPESA_API_URL, MPESA_SHORTCODE, MPESA_LIVE_KEY, MPESA_LIVE_SECRET, LIPA_NA_MPESA_ONLINE } from '../config';

class MpesaService {
    constructor() {
        this.authToken = '';
    }

    async generateAuthToken() {
        const auth = Buffer.from(`${MPESA_SHORTCODE}:${MPESA_LIVE_SECRET}`).toString('base64');
        const response = await axios.get(`${MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        this.authToken = response.data.access_token;
    }

    async sendStkPush(phoneNumber, amount, callbackUrl) {
        if (!this.authToken) {
            await this.generateAuthToken();
        }

        const payload = {
            BusinessShortCode: MPESA_SHORTCODE,
            Password: this.generatePassword(),
            Timestamp: this.getTimestamp(),
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: MPESA_SHORTCODE,
            PhoneNumber: phoneNumber,
            CallBackURL: callbackUrl,
            AccountReference: 'Test123',
            TransactionDesc: 'Payment for testing'
        };

        const response = await axios.post(LIPA_NA_MPESA_ONLINE, payload, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }

    generatePassword() {
        const timestamp = this.getTimestamp();
        return Buffer.from(`${MPESA_SHORTCODE}${MPESA_LIVE_SECRET}${timestamp}`).toString('base64');
    }

    getTimestamp() {
        const date = new Date();
        return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
    }
}

export default MpesaService;