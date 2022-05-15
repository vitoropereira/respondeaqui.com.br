import { prisma } from "../../service/prisma";
import nodemailer from "nodemailer";
import { SubmitFeedback } from "../../utils/submit-feedback";
import { PrismaFeedbacksRepository } from "../../repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMail } from "../../utils/nodemailer/nodemailerMail";

interface feedbackProps {
  type: string;
  comment: string;
  screenshot: string;
}

export default async function feedback(req, res) {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerSendMail = new NodemailerMail();

  const submitFeedback = new SubmitFeedback(
    prismaFeedbacksRepository,
    nodemailerSendMail
  );

  await submitFeedback.execute({ type, comment, screenshot });
  return res.status(201).send();
}
