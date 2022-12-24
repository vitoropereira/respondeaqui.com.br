import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import controller from "src/models/controller";
import { PrismaChatRepository } from "src/repositories/prisma/prismaChatsRepository";
import { Chats } from "src/models/chats";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
}).get(getHandler);

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const { question_id } = request.query;

  const prismaChatRepository = new PrismaChatRepository();
  const chats = new Chats(prismaChatRepository);

  const res = await chats.getChatsByQuestionsId(String(question_id));

  return response.status(200).json(res);
}
