import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import controller from "src/models/controller";
import { PrismaQuestionRepository } from "src/repositories/prisma/prismaQuestionsRepository";
import { Question } from "src/models/questions";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
}).get(getHandler);

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const { user_id } = request.query;
  const prismaQuestionRepository = new PrismaQuestionRepository();
  const questions = new Question(prismaQuestionRepository);

  const res = await questions.getQuestionsByuser_id(String(user_id));

  return response.status(200).json(res);
}
