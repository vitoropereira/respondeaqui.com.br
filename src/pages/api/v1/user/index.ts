import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import controller from "src/models/controller";
import authorization from "src/models/authorization";
import { UserModel } from "src/models/user";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .get(authorization.canRequest("read:session"), getHandler);

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUser = new UserModel(prismaUsersRepository);

  const authenticatedUser = getUser.getUserData(request);

  // const secureOutputValues = authorization.filterOutput(
  //   authenticatedUser,
  //   "read:user:self",
  //   authenticatedUser
  // );

  return response.status(200).json(authenticatedUser);
}
