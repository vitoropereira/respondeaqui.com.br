import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import controller from "src/models/controller";
import authorization from "src/models/authorization";
import { UserModel } from "src/models/user";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";
import user from "..";

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(postHandler); /*authorization.canRequest("read:session"),*/

async function postHandler(request: NextApiRequest, response: NextApiResponse) {
  const { userId } = request.query;

  const user = request.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const getUser = new UserModel(prismaUsersRepository);

  const updateUserTutorial = await getUser.updateUserData(String(userId), user);

  return response.status(200).json(updateUserTutorial);
}
