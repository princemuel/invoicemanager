import { getErrorMessage, objectKeys } from '@/helpers';
import { cache } from 'react';
import 'server-only';
import db from '../database';

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
