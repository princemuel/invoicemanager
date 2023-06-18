import { getErrorMessage, objectKeys } from '@/lib';
import db from './prisma';

export async function getInvoiceById(params: IParams) {
  try {
    for (const value of objectKeys(params)) {
      if (!params[value] || typeof params[value] !== 'string') return null;
    }

    const invoice = await db.invoice.findFirstOrThrow({
      where: { id: params.id, userId: params.userId },
    });
    if (!invoice) return null;

    return {
      ...invoice,
      createdAt: invoice.createdAt.toISOString(),
      updatedAt: invoice.updatedAt.toISOString(),
      issued: invoice.issued.toISOString(),
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
