import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "@service/user";

class UserController {
  private service = new UserService();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.getById({ id: parseInt(req.params.id) });
      res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.service.create(req.body);
      res.status(StatusCodes.CREATED).end();
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.service.update(req.body);
      res.status(StatusCodes.OK).end();
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.service.delete({ id: parseInt(req.params.id) });
      res.status(StatusCodes.OK).end();
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
