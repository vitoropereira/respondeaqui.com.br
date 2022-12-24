import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import controller, { RequestProps } from "src/models/controller";
import authorization from "src/models/authorization";

import { PrismaChatRepository } from "src/repositories/prisma/prismaChatsRepository";
import { Chats } from "src/models/chats";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(authorization.canRequest("create:content"), postHandler);

async function postHandler(req: RequestProps, res: NextApiResponse) {
  const prismaChatRepository = new PrismaChatRepository();
  const chats = new Chats(prismaChatRepository);

  const newChat = await chats.createChats(req.body);

  return res.status(201).json(newChat);
}
