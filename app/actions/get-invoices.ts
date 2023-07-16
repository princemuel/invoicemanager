import { getErrorMessage } from '@/lib';
import { cache } from 'react';
import 'server-only';
import db from '../database';

export const preload = (user: string) => {
  void fetchAllInvoices(user);
};

export const fetchAllInvoices = cache(
  async (user: string): Promise<InvoiceTypeSafe[]> => {
    try {
      const data = await db.invoice.findMany({
        where: {
          userId: user,
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
  }
);
