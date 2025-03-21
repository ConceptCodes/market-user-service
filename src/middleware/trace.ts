import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";

const traceIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.id = (req.get("x-Request-Id") as string) ?? uuidv4();
  res.setHeader("X-Request-Id", req.id);
  res.setHeader("X-Service-Name", env.SERVICE_NAME);
  next();
};

export default traceIdMiddleware;
