import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { UserModel } from "src/models/user";
import controller, { RequestProps } from "src/models/controller";
import authorization from "src/models/authorization";

import { User } from "@prisma/client";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(authorization.canRequest("create:user"), postHandler);

async function postHandler(request: RequestProps, response: NextApiResponse) {
  const prismaUsersRepository = new PrismaUsersRepository();
  const createUser = new UserModel(prismaUsersRepository);

  const newUser = await createUser.create(request.body);

  const secureOutputValues: User = authorization.filterOutput(
    newUser,
    "read:user",
    newUser
  );

  const data = {
    user: secureOutputValues,
  };

  return response.status(201).json(data);
}
