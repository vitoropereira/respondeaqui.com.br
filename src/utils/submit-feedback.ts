import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { SendMail } from "./sendMail";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private sendMail: SendMail
  ) {}

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("O tipo é obrigatório.");
    }

    if (!comment) {
      throw new Error("O comentário é obrigatório.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot da tela invalido.");
    }

    await this.feedbackRepository.create({ type, comment, screenshot });

    await this.sendMail.sendMail({
      subject: "Feedback",
      body: [
        `<div style="background-color: #f5f5f5; padding: 20px;">`,
        `<h1>Novo Feedback</h1>`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p>Screenshot: ${screenshot}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
