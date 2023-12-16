import { singleton } from "@/helpers/utils";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

export const db = singleton("prisma", () => {
  const THRESHHOLD = 20;
  const production = process.env.NODE_ENV === "production";

  const client = new PrismaClient({
    errorFormat: production ? "minimal" : "pretty",
    log:
      production ?
        ["error"]
      : [
          { level: "query", emit: "event" },
          { level: "error", emit: "stdout" },
          { level: "warn", emit: "stdout" },
        ],
  });

  client.$on("query", async (e) => {
    if (e.duration < THRESHHOLD) return;

    const color =
      e.duration < THRESHHOLD * 1.1 ? "green"
      : e.duration < THRESHHOLD * 1.2 ? "blue"
      : e.duration < THRESHHOLD * 1.3 ? "yellow"
      : e.duration < THRESHHOLD * 1.4 ? "redBright"
      : "red";

    const duration = chalk[color](`${e.duration}ms`);
    console.info(`prisma:query - ${duration} - ${e.query}`);
  });

  client.$connect();

  return client;
});
