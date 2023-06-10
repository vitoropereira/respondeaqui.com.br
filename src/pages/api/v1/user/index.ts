import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import controller from 'src/models/controller'
import authorization from 'src/models/authorization'
import { UserModel } from 'src/models/user'
import { PrismaUsersRepository } from 'src/repositories/prisma/prismaUserRepository'

export default nextConnect({
  attachParams: true,
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
})
  .use(controller.injectRequestMetadata)
  .post(getHandler) /* authorization.canRequest("read:session"), */

async function getHandler(request: NextApiRequest, response: NextApiResponse) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUser = new UserModel(prismaUsersRepository)

  const authenticatedUser = await getUser.getUserData(request)

  return response.status(200).json(authenticatedUser)
}
