import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6db0fbe4d8b552",
    pass: "4f5332cce62012"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  // Sempre que for assíncrono ele retorna uma Promise
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Mateus Jesus <batata@gmail.com>',
      subject: subject,
      html: body,
    });
  };
}