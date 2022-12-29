import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import controller, { RequestProps } from "src/models/controller";
import authorization from "src/models/authorization";

import { PrismaMessageRepository } from "src/repositories/prisma/prismaMessageRepository";
import { Messages } from "src/models/Messages";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(authorization.canRequest("create:content"), postHandler);

async function postHandler(req: RequestProps, res: NextApiResponse) {
  const prismaMessageRepository = new PrismaMessageRepository();
  const messages = new Messages(prismaMessageRepository);

  const newChat = await messages.createMessages(req.body);

  return res.status(201).json(newChat);
}
