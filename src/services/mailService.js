const transporter = require('../config/smtp');
class MailService {
    async sendMail({to, subject, html}){
        try {
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to,
                subject,
                html
            }
            const info = await transporter.sendMail(mailOptions);
            return {
                success: true,
                messageId: info.messageId
            }
        }   catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    
    }
}

module.exports = new MailService();