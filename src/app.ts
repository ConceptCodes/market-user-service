import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morganBody from "morgan-body";

import errorMiddleware from "@middleware/error";
import notFoundMiddleware from "@middleware/notFound";
import traceIdMiddleware from "@middleware/trace";
import loggerMiddleware from "@middleware/logger";
import type { Routes } from "@/constants";
import { env } from "@lib/env";
import logger from "@lib/logger";

class App {
  public app: any;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = env.PORT;
    this.env = env.NODE_ENV || "production";

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeNotFoundHandling();
  }

  public listen(): void {
    this.app.listen(this.port as number, () => {
      logger.info("=====================================================");
      logger.info(
        { env: this.env, port: this.port },
        "===== User Service started ========"
      );
      logger.info("=====================================================");
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddleware(): void {
    this.app.use(traceIdMiddleware);
    this.app.use(loggerMiddleware);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    morganBody(this.app, {
      logRequestId: true,
      immediateReqLog: true,
      noColors: ["production", "development"].includes(env.NODE_ENV),
      logRequestBody: env.NODE_ENV === "local",
      logResponseBody: env.NODE_ENV === "local",
    });
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeNotFoundHandling(): void {
    this.app.use("*", notFoundMiddleware);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
