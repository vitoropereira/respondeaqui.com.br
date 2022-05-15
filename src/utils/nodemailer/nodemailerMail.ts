import nodemailer from "nodemailer";
import { SendMail, SendMailData } from "../sendMail";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "83c808d0fdfc45",
    pass: "d4527f8c8e1d3b",
  },
});

export class NodemailerMail implements SendMail {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Portal dev <portaldev@portaldev.digital>",
      to: "Vitor <vop1234@hotmail.com>",
      subject,
      html: body,
    });
  }
}
