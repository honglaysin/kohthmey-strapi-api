const nodemailer = require('nodemailer');

module.exports = ({ env }) => ({
  provider: 'custom',
  providerOptions: {
    init: ({ settings }) => {
      const transporter = nodemailer.createTransport({
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: parseInt(env('SMTP_PORT', '465'), 10),
        secure: true,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      });

      return {
        send: async (options) => {
          await transporter.sendMail({
            from: env('SMTP_USERNAME'),
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
          });
        },
      };
    },
  },
  settings: {
    defaultFrom: env('SMTP_USERNAME'),
    defaultReplyTo: env('SMTP_USERNAME'),
  },
});
