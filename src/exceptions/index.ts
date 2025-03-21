import { StatusCodes } from "http-status-codes";
import { ErrorCodes } from "@/constants";

export class HttpException extends Error {
  status: number;
  message: string;
  code: string;
  constructor(status: number, message: string, code?: keyof typeof ErrorCodes) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code ?? ErrorCodes.INTERNAL_ERROR;
  }
}

export class ValidationError extends HttpException {
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message || "Validation error");
  }
}

export class NotFoundError extends HttpException {
  constructor(message?: string) {
    super(
      StatusCodes.NOT_FOUND,
      message || "Resource not found",
      "GET_ENTITY_BY_ID_ERROR"
    );
  }
}

export class UpdateConflictError extends HttpException {
  constructor(message?: string) {
    super(
      StatusCodes.CONFLICT,
      message || "Update conflict error",
      "UPDATE_ENTITY_ERROR"
    );
  }
}

export class CreateConflictError extends HttpException {
  constructor(message?: string) {
    super(
      StatusCodes.CONFLICT,
      message || "Create conflict error",
      "CREATE_ENTITY_ERROR"
    );
  }
}

export class DeleteConflictError extends HttpException {
  constructor(message?: string) {
    super(
      StatusCodes.CONFLICT,
      message || "Delete conflict error",
      "DELETE_ENTITY_ERROR"
    );
  }
}

export class InternalError extends HttpException {
  constructor(message?: string) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message ?? "Something went wrong",
      "INTERNAL_ERROR"
    );
  }
}
