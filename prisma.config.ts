// SPDX-License-Identifier: Apache-2.0
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "node --import=tsx prisma/seed.ts" },
  engine: "classic",
  datasource: { url: env("DATABASE_URL") },
});
