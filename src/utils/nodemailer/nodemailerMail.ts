import nodemailer from "nodemailer";
import { SendMail, SendMailData } from "../sendMail";

const transport = nodemailer.createTransport({
  service: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "vop1234@hotmail.com",
    pass: "AFj6TnN9V10Kvmwy",
  },
});

export class NodemailerMail implements SendMail {
  async sendMail({ subject, body }: SendMailData) {
    // verify connection configuration
    transport.verify(function (error, success) {
      if (error) {
        console.log(error, "Mensagem de error!!! (sendMail)");
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    // await transport.sendMail({
    //   from: "Equipe Portal dev <portaldev@portaldev.digital>",
    //   to: "Vitor <vop1234@hotmail.com>",
    //   subject,
    //   html: body,
    // });
  }
}
