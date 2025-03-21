import { and, eq } from "drizzle-orm";

import { db } from "@lib/db";
import { userTable, type User } from "@lib/db/schema";
import { createLogger } from "@lib/logger";
import { takeFirst } from "@/util";
import {
  CreateConflictError,
  DeleteConflictError,
  InternalError,
  NotFoundError,
  UpdateConflictError,
} from "@/exceptions";
import type {
  CreateUserSchema,
  GetUserSchema,
  UpdateUserSchema,
} from "@/schema";

const logger = createLogger("user-service");

export default class UserService {
  public async getById(data: GetUserSchema): Promise<User> {
    try {
      const users = await db
        .select()
        .from(userTable)
        .where(and(eq(userTable.id, data.id)));

      const user = takeFirst(users);

      if (!user) {
        logger.error("User not found");
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      logger.error({ error }, "Login failed");
      throw new InternalError("Login failed");
    }
  }

  public async create(data: CreateUserSchema): Promise<void> {
    try {
      await db.insert(userTable).values({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      logger.error({ error }, "Create user failed");
      throw new CreateConflictError("Create user failed");
    }
  }

  public async update(data: UpdateUserSchema): Promise<void> {
    try {
      await db
        .update(userTable)
        .set({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        })
        .where(eq(userTable.id, data.id));
    } catch (error) {
      logger.error({ error }, "Update user failed");
      throw new UpdateConflictError("Update user failed");
    }
  }

  public async delete(data: GetUserSchema): Promise<void> {
    try {
      await db.delete(userTable).where(eq(userTable.id, data.id));
    } catch (error) {
      logger.error({ error }, "Delete user failed");
      throw new DeleteConflictError("Delete user failed");
    }
  }
}
