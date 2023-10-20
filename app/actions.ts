'use server';

import { InvoiceSchema } from '@/lib/models/invoice';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type ServerActionResult =
  | {
      type: 'success';
      message: string;
    }
  | {
      type: 'error';
      errors: Record<string, string[] | undefined>;
    }
  | { type: null; message: null };

export async function createInvoice(
  prevState: ServerActionResult,
  formData: FormData
) {
  const schema = InvoiceSchema;

  try {
    const data = schema.parse({
      issued: formData.get('issued'),
      paymentDue: formData.get('paymentDue'),
      paymentTerms: formData.get('paymentTerms'),
      status: formData.get('status'),
      // slug: formData.get('slug'),
      total: formData.get('total'),
      userId: formData.get('userId'),
      description: formData.get('description'),
      clientName: formData.get('clientName'),
      clientEmail: formData.get('clientEmail'),
      clientAddress: {
        street: formData.get('clientAddress.street'),
        city: formData.get('clientAddress.city'),
        country: formData.get('clientAddress.country'),
        postCode: formData.get('clientAddress.postCode'),
      },
      senderAddress: {
        street: formData.get('senderAddress.street'),
        city: formData.get('senderAddress.city'),
        country: formData.get('senderAddress.country'),
        postCode: formData.get('senderAddress.postCode'),
      },
      // clientAddress: '',
      // senderAddress: '',
      // paymentDue: formData.get('paymentDue'),
      // paymentDue: formData.get('paymentDue'),
    });

    console.log(data);

    // revalidatePath('/');

    return {
      type: 'success' as const,
      message: `Added invoice ${data?.description}`,
    } satisfies ServerActionResult;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        type: 'error' as const,
        errors: e.flatten().fieldErrors,
      } satisfies ServerActionResult;
    }

    return {
      type: 'error' as const,
      errors: {
        server: ['Failed to create invoice'],
      },
    } satisfies ServerActionResult;
  }
}

export async function deleteInvoice(prevState: any, formData: FormData) {
  const schema = z.object({
    invoice: z.string().min(1),
  });

  try {
    const data = schema.parse({
      invoice: formData.get('invoice'),
    });

    revalidatePath('/');
    return { message: `Deleted invoice ${data.invoice}` };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { message: `${e.toString()}` };
    }
    return { message: 'Failed to delete invoice' };
  }
}
