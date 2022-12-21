import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { UserModel } from "src/models/user";
import controller, { RequestProps } from "src/models/controller";
import authorization from "src/models/authorization";

import { User } from "@prisma/client";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";
import { PrismaQuestionRepository } from "src/repositories/prisma/prismaQuestionsRepository";
import { Question } from "src/models/questions";
import { PrismaChatRepository } from "src/repositories/prisma/prismaChatsRepository";
import { Chats } from "src/models/chats";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(authorization.canRequest("create:content"), postHandler);

async function postHandler(request: RequestProps, response: NextApiResponse) {
  const prismaChatRepository = new PrismaChatRepository();
  const chats = new Chats(prismaChatRepository);

  const newChat = await chats.createChats(request.body);

  return response.status(201).json(newChat);
}
