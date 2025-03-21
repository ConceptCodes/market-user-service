import { Router } from "express";
import UserController from "@controller/user";
import type { Routes } from "@/constants";
import ValidationMiddleware from "@middleware/validation";
import { getUserSchema, updateUserSchema } from "@/schema";

export default class UserRoute implements Routes {
  public path = "/user";
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}/:id`,
      ValidationMiddleware(getUserSchema, "params"),
      this.controller.getUser
    );
    this.router.post(
      this.path,
      ValidationMiddleware(updateUserSchema),
      this.controller.updateUser
    );
    this.router.patch(
      this.path,
      ValidationMiddleware(updateUserSchema),
      this.controller.updateUser
    );
    this.router.delete(
      `${this.path}/:id`,
      ValidationMiddleware(getUserSchema, "params"),
      this.controller.deleteUser
    );
  }
}
