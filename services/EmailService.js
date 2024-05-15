class EmailService {
    sendEmail({to, subject, text}) {
        // Logic to send email
        console.log(`Sending email to ${to} with subject "${subject}" and text "${text}"`);
    }
}
module.exports = new EmailService();
```