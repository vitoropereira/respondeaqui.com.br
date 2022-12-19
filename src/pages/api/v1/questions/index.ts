import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { UserModel } from "src/models/user";
import controller, { RequestProps } from "src/models/controller";
import authorization from "src/models/authorization";

import { User } from "@prisma/client";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";
import { PrismaQuestionRepository } from "src/repositories/prisma/prismaQuestionsRepository";
import { Question } from "src/models/questions";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(authorization.canRequest("create:content"), postHandler)
  .get(getHandler);

async function postHandler(request: RequestProps, response: NextApiResponse) {
  const prismaQuestionRepository = new PrismaQuestionRepository();
  const question = new Question(prismaQuestionRepository);

  const newQuestion = await question.createQuestion(request.body);

  return response.status(201).json(newQuestion);
}

async function getHandler(request: RequestProps, response: NextApiResponse) {
  const prismaQuestionRepository = new PrismaQuestionRepository();
  const question = new Question(prismaQuestionRepository);

  const questions = await question.getAllQuestions();

  return response.status(200).json(questions);
}
