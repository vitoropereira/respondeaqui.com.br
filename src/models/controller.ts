import { v4 as uuidV4 } from "uuid";

import {
  BaseErrorProps,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
  ValidationError,
} from "errors/index";

import { NextApiRequest, NextApiResponse } from "next";
export interface RequestProps extends NextApiRequest {
  context: {
    requestId: string;
    clientIp: string;
    features: string[];
  };
}

async function onNoMatchHandler(
  request: RequestProps,
  response: NextApiResponse
) {
  const errorObject = new NotFoundError({
    requestId: request.context?.requestId || uuidV4(),
  });
  return response.status(errorObject.statusCode).json(errorObject);
}

async function injectRequestMetadata(
  request: RequestProps,
  response: NextApiResponse,
  next: () => void
) {
  request.context = {
    ...request.context,
    requestId: uuidV4(),
    clientIp: extractAnonymousIpFromRequest(request),
  };

  function extractAnonymousIpFromRequest(request: NextApiRequest) {
    let ip = request.headers["x-real-ip"] || request.socket.remoteAddress;

    if (ip === "::1") {
      ip = "127.0.0.1";
    }

    if (ip.substring(0, 7) == "::ffff:") {
      ip = ip.substring(7);
    }

    const ipParts = ip.split(".");
    ipParts[3] = "0";
    const anonymizedIp = ipParts.join(".");

    return anonymizedIp;
  }

  next();
}

function onErrorHandler(
  error: BaseErrorProps,
  request: RequestProps,
  response: NextApiResponse
) {
  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ForbiddenError ||
    error instanceof UnprocessableEntityError
  ) {
    const errorObject = { ...error, requestId: request.context.requestId };
    return response.status(error.statusCode).json(errorObject);
  }

  if (error instanceof UnauthorizedError) {
    const errorObject = { ...error, requestId: request.context.requestId };
    // session.clearSessionIdCookie(response);
    return response.status(error.statusCode).json(errorObject);
  }

  if (error instanceof TooManyRequestsError) {
    const errorObject = { ...error, requestId: request.context.requestId };
    return response.status(error.statusCode).json(errorObject);
  }

  const errorObject = new InternalServerError({
    requestId: request.context.requestId,
    errorId: error.errorId,
    stack: error.stack,
    statusCode: error.statusCode,
    errorLocationCode: error.errorLocationCode,
  });

  const responseArray = [errorObject];
  // TODO: Understand why `snakeize` is not logging the
  // `stack` property of the error object.

  return response.status(errorObject.statusCode).json(responseArray);
}

export default Object.freeze({
  onNoMatchHandler,
  onErrorHandler,
  injectRequestMetadata,
});
