import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import controller from "src/models/controller";
import { PrismaChatsRepository } from "src/repositories/prisma/prismaChatsRepository";
import { Chats } from "src/models/chats";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
}).get(getHandler);

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const { userId } = request.query;

  const prismaChatsRepository = new PrismaChatsRepository();
  const chats = new Chats(prismaChatsRepository);

  const res = await chats.getChatsByUserId(String(userId));

  return response.status(200).json(res);
}
