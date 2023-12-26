import { singleton } from "@/helpers/utils";
import { PrismaClient } from "@prisma/client";

export const db = singleton("__db__", () => {
  const production = process.env.NODE_ENV === "production";
  const client = new PrismaClient({
    errorFormat: production ? "minimal" : "pretty",
    log: production ? ["error"] : ["query", "error", "warn"],
  });
  client.$connect();
  return client;
});
