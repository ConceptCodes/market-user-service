import { z } from "zod";

const envVars = z.object({
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z
    .enum(["local", "development", "production"])
    .default("production"),

  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number().int().positive().default(5432),
  DATABASE_NAME: z.string(),

  CORS_ORIGIN: z.string().url().optional(),
  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug"])
    .default("info"),

  API_GATEWAY_URL: z.string().url(),
  SERVICE_NAME: z.string().default("user-service"),
});

const env = envVars.parse(process.env);
export { env };
