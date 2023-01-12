import { PrismaClient } from "@prisma/client";
import { BaseNextRequest, BaseNextResponse } from "next/dist/server/base-http";
import { RequestContext } from "next/dist/server/base-server";
import { prisma } from "../clients";

export interface Context {
  request: BaseNextRequest<any>;
  response: BaseNextResponse<any>;
  db: PrismaClient;
}

export const createContext = async (
  context: RequestContext
): Promise<Partial<Context>> => {
  const ctx: Context = {
    ...context,
    request: context.req,
    response: context.res,
    db: prisma,
  };

  return ctx;
};
