import { getAuthSession } from '@/app/database/lib';
import db from '@/app/db.server';
import { handleServerError } from '@/helpers';
import { NewInvoiceServerSchema } from '@/lib';
import { HttpError } from 'http-errors-enhanced';
import { produce } from 'immer';
import { createRandomHex } from '../utils.invoices';

const generateHex = createRandomHex();

const schema = NewInvoiceServerSchema;

export async function POST(request: Request) {
  try {
    const { authenticated } = getAuthSession();
    if (!authenticated)
      throw new HttpError(
        401,
        'Unauthorized request: Check your login details and try again'
      );

    const result = schema.parse(await request.json());

    const body = produce(result, (draft) => {
      draft.slug = generateHex.next().value;
    });

    console.log(body);

    const response = await db.invoice.create({
      data: body,
    });

    return Response.json(
      {
        status: 'success',
        data: `Invoice #${response?.slug?.toUpperCase()} created!`,
      },
      { status: 201 }
    );
  } catch (e) {
    return handleServerError(e);
  }
}
