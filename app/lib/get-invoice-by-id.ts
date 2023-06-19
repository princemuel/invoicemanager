import { getErrorMessage, objectKeys } from '@/lib';
import db from './prisma';

export async function getInvoiceById(
  params: IParams
): Promise<InvoiceTypeSafe | null> {
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
    throw new Error(getErrorMessage(error));
  }
}
