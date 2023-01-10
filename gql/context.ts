import { PrismaClient } from "@prisma/client";
import { prisma } from "lib";
import { BaseNextRequest, BaseNextResponse } from "next/dist/server/base-http";
import { RequestContext } from "next/dist/server/base-server";

export interface Context {
  request: BaseNextRequest<any>;
  response: BaseNextResponse<any>;
  prisma: PrismaClient;
}

export const createContext = async (
  context: RequestContext
): Promise<Partial<Context>> => {
  const ctx: Context = {
    ...context,
    request: context.req,
    response: context.res,
    prisma: prisma,
  };
  return ctx;
};
