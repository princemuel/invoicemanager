import "dotenv/config";
import { PrismaClient } from "./prisma/client";

var DatabaseClient = new PrismaClient();
var g = globalThis as typeof globalThis & { __db__?: typeof DatabaseClient };

export var db = g.__db__ ?? DatabaseClient;

if (process.env.NODE_ENV !== "production") g.__db__ = db;
process.on("beforeExit", () => void db.$disconnect());
