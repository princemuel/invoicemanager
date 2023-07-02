import { getErrorMessage } from '@/lib';
import { cache } from 'react';
import 'server-only';
import { fetchAuthUser } from './get-user';
import db from './prisma';

export const preload = () => {
  void fetchAllInvoices();
};

export const fetchAllInvoices = cache(async (): Promise<InvoiceTypeSafe[]> => {
  try {
    const user = await fetchAuthUser();
    if (!user) return [];

    const data = await db.invoice.findMany({
      where: {
        userId: user.id,
      },
    });
    if (!data) return [];

    return data.map((invoice) => {
      return {
        ...invoice,
        createdAt: invoice.createdAt.toISOString(),
        updatedAt: invoice.updatedAt.toISOString(),
      };
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
});
