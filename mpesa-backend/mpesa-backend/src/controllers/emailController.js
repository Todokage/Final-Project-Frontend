import nodemailer from 'nodemailer';

class EmailController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendFeedbackEmail(to, subject, message) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, message: 'Failed to send email' };
        }
    }
}

export default EmailController;