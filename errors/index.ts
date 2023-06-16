import { v4 as uuid } from 'uuid'

export interface BaseErrorProps {
  message?: string
  stack?: string | undefined
  action?: string
  statusCode?: number
  errorId?: string
  requestId?: string | undefined
  context?: string
  errorLocationCode?: string
  key?: string
  type?: string
  databaseErrorCode?: string
}

class BaseError extends Error {
  action?: string
  statusCode?: number
  errorId?: string
  requestId?: string | undefined
  context?: string
  stack?: string | undefined
  errorLocationCode?: string
  key?: string
  type?: string
  databaseErrorCode?: string

  constructor({
    message,
    stack,
    action,
    statusCode,
    errorId,
    requestId,
    context,
    errorLocationCode,
    key,
    type,
    databaseErrorCode,
  }: BaseErrorProps) {
    super()
    this.name = this.constructor.name
    this.message = message || ''
    this.action = action
    this.statusCode = statusCode || 500
    this.errorId = errorId || uuid()
    this.requestId = requestId
    this.context = context
    this.stack = stack
    this.errorLocationCode = errorLocationCode
    this.key = key
    this.type = type
    this.databaseErrorCode = databaseErrorCode
  }
}

export class NotFoundError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    errorId,
    stack,
    errorLocationCode,
    key,
  }: BaseErrorProps) {
    super({
      message: message || 'Não foi possível encontrar este recurso no sistema.',
      action:
        action ||
        'Verifique se o caminho (PATH) e o método (GET, POST, PUT, DELETE) estão corretos.',
      statusCode: 404,
      requestId,
      errorId,
      stack,
      errorLocationCode,
      key,
    })
  }
}

export class ForbiddenError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
  }: BaseErrorProps) {
    super({
      message: message || 'Você não possui permissão para executar esta ação.',
      action:
        action || 'Verifique se você possui permissão para executar esta ação.',
      requestId,
      statusCode: 403,
      stack,
      errorLocationCode,
    })
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor({ message, action, stack, errorLocationCode }: BaseErrorProps) {
    super({
      message: message || 'Não foi possível realizar esta operação.',
      action:
        action ||
        'Os dados enviados estão corretos, porém não foi possível realizar esta operação.',
      statusCode: 422,
      stack,
      errorLocationCode,
    })
  }
}

export class InternalServerError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    errorId,
    statusCode,
    stack,
    errorLocationCode,
  }: BaseErrorProps) {
    super({
      message: message || 'Um erro interno não esperado aconteceu.',
      action:
        action || "Informe ao suporte o valor encontrado no campo 'error_id'.",
      statusCode: statusCode || 500,
      requestId,
      errorId,
      stack,
      errorLocationCode,
    })
  }
}

export class TooManyRequestsError extends BaseError {
  constructor({
    message,
    action,
    context,
    stack,
    errorLocationCode,
  }: BaseErrorProps) {
    super({
      message: message || 'Você realizou muitas requisições recentemente.',
      action:
        action ||
        'Tente novamente mais tarde ou contate o suporte caso acredite que isso seja um erro.',
      statusCode: 429,
      context,
      stack,
      errorLocationCode,
    })
  }
}
export class UnauthorizedError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
  }: BaseErrorProps) {
    super({
      message: message || 'Usuário não autenticado.',
      action:
        action ||
        'Verifique se você está autenticado com uma sessão ativa e tente novamente.',
      requestId,
      statusCode: 401,
      stack,
      errorLocationCode,
    })
  }
}

export class ValidationError extends BaseError {
  constructor({
    message,
    action,
    stack,
    statusCode,
    context,
    errorLocationCode,
    key,
    type,
  }: BaseErrorProps) {
    super({
      message: message || 'Um erro de validação ocorreu.',
      action: action || 'Ajuste os dados enviados e tente novamente.',
      statusCode: statusCode || 400,
      stack,
      context,
      errorLocationCode,
      key,
      type,
    })
  }
}

export class ServiceError extends BaseError {
  constructor({
    message,
    action,
    stack,
    context,
    statusCode,
    errorLocationCode,
    databaseErrorCode,
  }: BaseErrorProps) {
    super({
      message: message || 'Serviço indisponível no momento.',
      action: action || 'Verifique se o serviço está disponível.',
      stack,
      statusCode: statusCode || 503,
      context,
      errorLocationCode,
      databaseErrorCode,
    })
  }
}
