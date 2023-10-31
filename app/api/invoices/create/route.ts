import { produce } from 'immer';
import { z } from 'zod';
import { createRandomHex } from '../utils.invoices';
import db from '@/app/_data/db.dto';
import { AddressSchema, BaseInvoiceSchema, ItemSchema } from '@/lib';
import { StringContraint, EmailContraint } from '@/lib/models/constraints';
import { handleServerError } from '@/helpers';

const generateHex = createRandomHex();

const InvoiceSchema = BaseInvoiceSchema.extend({
  clientName: StringContraint,
  clientEmail: EmailContraint,
  clientAddress: AddressSchema,
  senderAddress: AddressSchema,

  issued: z.string().datetime(),
  description: StringContraint,
  items: ItemSchema.array().nonempty(),
});

export async function POST(request: Request) {
  try {
    // validate set
    const result = InvoiceSchema.safeParse(await request.json());
    if (!result.success) throw result.error;

    const body = produce(result.data, (draft) => {
      draft.slug = generateHex.next().value;
    });

    console.log(body);

    // const response = await db.invoice.create({
    //   data: body,
    // });

    return Response.json(
      {
        success: true,
        data: `Invoice #${body?.slug?.toUpperCase()} created!`,
      },
      { status: 201 }
    );
  } catch (e) {
    return handleServerError(e);
  }
}
