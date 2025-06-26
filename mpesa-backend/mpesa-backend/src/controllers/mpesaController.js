import { MpesaService } from '../services/mpesaService';
import { EmailService } from '../services/emailService';

class MpesaController {
    constructor() {
        this.mpesaService = new MpesaService();
        this.emailService = new EmailService();
    }

    async initiateStkPush(req, res) {
        const { phoneNumber, amount } = req.body;

        try {
            const response = await this.mpesaService.sendStkPush(phoneNumber, amount);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: 'Error initiating STK push', error: error.message });
        }
    }

    async handleStkPushNotification(req, res) {
        const notification = req.body;

        try {
            // Process the notification (e.g., save to database, etc.)
            // Send feedback email
            await this.emailService.sendFeedbackEmail(notification);

            res.status(200).json({ message: 'Notification processed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error processing notification', error: error.message });
        }
    }
}

export default MpesaController;