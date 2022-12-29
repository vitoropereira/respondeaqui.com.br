import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import controller from "src/models/controller";
import { Messages } from "src/models/Messages";
import { PrismaMessageRepository } from "src/repositories/prisma/prismaMessageRepository";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
}).get(getHandler);

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const { chatId } = request.query;

  const prismaMessageRepository = new PrismaMessageRepository();
  const messages = new Messages(prismaMessageRepository);

  const res = await messages.getMessagesByChatId(String(chatId));

  return response.status(200).json(res);
}
