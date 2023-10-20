import { getErrorMessage, objectKeys } from '@/helpers';
import {
  getKindeServerSession,
  type KindeUser,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { cache } from 'react';
// import 'server-only';
import db from './_db';

export async function createAuthUser(client: KindeUser): Promise<AuthUser> {
  let user = await db.user.findUnique({
    where: {
      email: client?.email?.toLowerCase(),
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        kindeId: client.id || '',
        email: client.email?.toLowerCase(),
        firstName: client?.given_name,
        lastName: client?.family_name,
        image: client?.picture,
      },
    });
  }

  return {
    ...user,
    createdAt: user?.createdAt.toISOString(),
    updatedAt: user?.updatedAt.toISOString(),
  } satisfies AuthUser;
}

export function getAuthSession() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  return [isAuthenticated(), getUser()] as const;
}

export const preload = (params: IParams) => {
  void getInvoiceById(params);
};

export const getInvoiceById = cache(
  async (params: IParams): Promise<InvoiceTypeSafe | null> => {
    try {
      for (const value of objectKeys(params)) {
        if (!params[value] || typeof params[value] !== 'string') return null;
      }

      const invoice = await db.invoice.findUnique({
        where: { id: params.id },
      });
      if (!invoice) return null;

      return {
        ...invoice,
        createdAt: invoice.createdAt.toISOString(),
        updatedAt: invoice.updatedAt.toISOString(),
      };
    } catch (error) {
      console.log(getErrorMessage(error));
      return null;
    }
  }
);

export const preloadInvoices = (userId: string) => {
  void fetchAllInvoices(userId);
};

export const fetchAllInvoices = cache(
  async (userId: string): Promise<InvoiceTypeSafe[]> => {
    try {
      const data = await db.invoice.findMany({
        where: {
          userId: userId,
        },
      });

      return (data || []).map((invoice) => {
        return {
          ...invoice,
          createdAt: invoice.createdAt.toISOString(),
          updatedAt: invoice.updatedAt.toISOString(),
        };
      });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
);
