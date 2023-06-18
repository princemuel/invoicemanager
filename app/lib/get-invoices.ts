import { getErrorMessage } from '@/lib';
import { getUser } from './get-user';
import db from './prisma';

export async function fetchAllInvoices(): Promise<InvoiceType[]> {
  try {
    const user = await getUser();
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
}
