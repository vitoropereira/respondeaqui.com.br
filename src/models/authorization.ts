import { User } from "@prisma/client";
import { ForbiddenError, ValidationError } from "errors";
import { NextApiResponse } from "next";
import { PrismaUsersRepository } from "src/repositories/prisma/prismaUserRepository";
import { RequestProps } from "./controller";

const availableFeatures = new Set([
  // USER
  "create:user",
  "read:user",
  "read:user:self",
  "read:user:list",
  "update:user",
  "ban:user",

  // MIGRATION
  "read:migration",
  "create:migration",

  // ACTIVATION_TOKEN
  "read:activation_token",

  // RECOVERY_TOKEN
  "read:recovery_token",

  // EMAIL_CONFIRMATION_TOKEN
  "read:email_confirmation_token",

  // SESSION
  "create:session",
  "read:session",

  // CONTENT
  "read:content",
  "update:content",
  "update:content:others",
  "create:content",
  "create:content:text_root",
  "create:content:text_child",
  "read:content:list",
  "read:content:tabcoins",
]);

async function can(user: User, feature: string) {
  // const usersRepository = new PrismaUsersRepository();
  // const userFeatures = await usersRepository.getActiveFeaturesByUserId(user.id);
  validateUser(user);
  validateFeature(feature);

  let authorized = false;

  // userFeatures.map((item) => {
  //   if (item.context === feature) {
  //   }
  // });
  authorized = true;

  return authorized;
}

function filterInput(user: User, feature: string, input: any) {
  validateUser(user);
  validateFeature(feature);
  validateInput(input);

  let filteredInputValues = {};

  if (feature === "create:session" && can(user, feature)) {
    filteredInputValues = {
      email: input.email,
      password: input.password,
    };
  }

  if (feature === "create:user" && can(user, feature)) {
    filteredInputValues = {
      username: input.username,
      email: input.email,
      password: input.password,
    };
  }

  if (feature === "update:user" && can(user, feature)) {
    filteredInputValues = {
      username: input.username,
      email: input.email,
      password: input.password,
      // notifications: input.notifications,
    };
  }

  if (feature === "read:activation_token" && can(user, feature)) {
    filteredInputValues = {
      tokenId: input.token_id,
    };
  }

  // Force the clean up of "undefined" values
  return JSON.parse(JSON.stringify(filteredInputValues));
}

function filterOutput(user: User, feature: string, output: any) {
  validateUser(user);
  validateFeature(feature);
  validateOutput(output);

  let filteredOutputValues = {};

  if (feature === "read:session" && can(user, feature)) {
    if (user.id && output.user_id && user.id === output.user_id) {
      filteredOutputValues = {
        id: output.id,
        expires_at: output.expires_at,
        created_at: output.created_at,
        updated_at: output.updated_at,
      };
    }
  }

  if (feature === "create:session" && can(user, feature)) {
    if (user.id && output.user_id && user.id === output.user_id) {
      filteredOutputValues = {
        id: output.id,
        token: output.token,
        expires_at: output.expires_at,
        created_at: output.created_at,
        updated_at: output.updated_at,
      };
    }
  }

  if (feature === "read:user") {
    filteredOutputValues = {
      id: output.id,
      username: output.username,
      features: output.features,
      created_at: output.created_at,
      updated_at: output.updated_at,
    };
  }

  if (feature === "read:user:self") {
    if (user.id && output.id && user.id === output.id) {
      filteredOutputValues = {
        id: output.id,
        username: output.username,
        email: output.email,
        features: output.features,
        created_at: output.created_at,
        updated_at: output.updated_at,
      };
    }
  }

  if (feature === "read:user:list") {
    filteredOutputValues = output.map((user: User) => ({
      id: user.id,
      username: user.username,
      features: user.features,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  }

  if (feature === "read:activation_token") {
    filteredOutputValues = {
      id: output.id,
      used: output.used,
      expires_at: output.expires_at,
      created_at: output.created_at,
      updated_at: output.updated_at,
    };
  }

  if (feature === "read:recovery_token") {
    const keys = {
      id: "required",
      used: "required",
      expires_at: "required",
      created_at: "required",
      updated_at: "required",
    };
    const readTokenValidator = {
      object: output,
      keys,
    };

    // filteredOutputValues = validator(readTokenValidator);
  }

  if (feature === "read:email_confirmation_token") {
    const keys = {
      id: "required",
      used: "required",
      expires_at: "required",
      created_at: "required",
      updated_at: "required",
    };
    const readTokenValidator = {
      object: output,
      keys,
    };
    // filteredOutputValues = validator(readTokenValidator);
  }

  // Force the clean up of "undefined" values
  return JSON.parse(JSON.stringify(filteredOutputValues));
}

function validateUser(user: User) {
  if (!user) {
    throw new ValidationError({
      message: `Nenhum "user" foi especificado para a ação de autorização.`,
      action: `Contate o suporte informado o campo "errorId".`,
    });
  }

  if (!user.features || !Array.isArray(user.features)) {
    throw new ValidationError({
      message: `"user" não possui "features" ou não é um array.`,
      action: `Contate o suporte informado o campo "errorId".`,
    });
  }
}

function validateFeature(feature: string) {
  if (!feature) {
    throw new ValidationError({
      message: `Nenhuma "feature" foi especificada para a ação de autorização.`,
      action: `Contate o suporte informado o campo "errorId".`,
    });
  }

  if (!availableFeatures.has(feature)) {
    throw new ValidationError({
      message: `A feature utilizada não está disponível na lista de features existentes.`,
      action: `Contate o suporte informado o campo "errorId".`,
    });
  }
}

function validateInput(input: User) {
  if (!input) {
    throw new ValidationError({
      message: `Nenhum "input" foi especificado para a ação de filtro.`,
      action: `Contate o suporte informado o campo "errorId".`,
    });
  }
}

function validateOutput(output: User) {
  if (!output) {
    throw new ValidationError({
      message: `Nenhum "output" foi especificado para a ação de filtro.`,
      action: `Contate o suporte informado o campo "errorId".`,
    });
  }
}

function canRequest(feature: string) {
  return function (
    request: RequestProps,
    response: NextApiResponse,
    next: () => void
  ) {
    const userTryingToRequest = request.body;
    if (!can(userTryingToRequest, feature)) {
      throw new ForbiddenError({
        message: `Usuário não pode executar esta operação.`,
        action: `Verifique se este usuário possui a feature "${feature}".`,
        errorLocationCode: "MODEL:AUTHORIZATION:CAN_REQUEST:FEATURE_NOT_FOUND",
      });
    }

    next();
  };
}

export default Object.freeze({
  can,
  canRequest,
  filterOutput,
  filterInput,
});
