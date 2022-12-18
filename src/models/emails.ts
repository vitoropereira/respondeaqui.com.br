import { User } from "@prisma/client";
import { EmailRepository } from "src/repositories/emailsRepository";

export class Emails {
  constructor(private emailsRepository: EmailRepository) {}
  async sendActivationEmailToUser(user: User, tokenId: string) {
    const activationPageEndpoint = this.getActivationPageEndpoint(tokenId);

    await this.emailsRepository.send({
      from: {
        name: "Portal Dev.",
        address: "contato@portaldev.digital",
      },
      to: user.email,
      subject: "Ative seu cadastro no Sistema",
      text: `${user.username}, clique no link abaixo para ativar seu cadastro no Sistema:

      ${activationPageEndpoint}

      Caso você não tenha feito esta requisição, ignore esse email.

      Atenciosamente,
      Equipe Sistema
      Rua Azul, 510, Recife, PE, 51130-180`,
    });
  }

  getActivationPageEndpoint(tokenId: string) {
    const webserverHost = `http://${process.env.WEBSERVER_HOST}:${process.env.WEBSERVER_PORT}`;
    return tokenId
      ? `${webserverHost}/cadastro/ativar/${tokenId}`
      : `${webserverHost}/cadastro/ativar`;
  }
}
