import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { UserModel } from "src/models/user";
import controller, { RequestProps } from "src/models/controller";
import authorization from "src/models/authorization";

import { User } from "@prisma/client";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";

import { Chats } from "src/models/chats";
import { PrismaChatsRepository } from "src/repositories/prisma/prismaChatsRepository";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(postHandler)
  .get(getHandler);

async function postHandler(request: RequestProps, response: NextApiResponse) {
  const prismaChatsRepository = new PrismaChatsRepository();
  const chat = new Chats(prismaChatsRepository);

  const newChat = await chat.createChat(request.body);

  return response.status(201).json(newChat);
}

async function getHandler(request: RequestProps, response: NextApiResponse) {
  const prismaChatsRepository = new PrismaChatsRepository();
  const chat = new Chats(prismaChatsRepository);

  const allChats = await chat.getAllChats();

  return response.status(200).json(allChats);
}
