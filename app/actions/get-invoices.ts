import { getErrorMessage } from '@/helpers';
import { cache } from 'react';
import 'server-only';
import db from '../database';

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
