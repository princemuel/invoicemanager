import db from '@/app/database';
import { objectKeys } from '@/helpers';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import createHttpError from 'http-errors';
import { produce } from 'immer';
import { NextResponse } from 'next/server';
import ShortUniqueId from 'short-unique-id';

const suid = new ShortUniqueId({
  dictionary: 'hex',
});

export async function POST(request: Request) {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated())
    throw new createHttpError.Unauthorized(`This session is not authorized`);

  const body: InvoiceTypeSafe = await request.json();
  // use zod to validate data
  for (const value of objectKeys(body)) {
    if (body[value] == undefined) {
      throw new createHttpError.BadRequest(
        `Malformed data received. Got ${body[value]}`
      );
    }
  }

  const data = produce(body, (draft) => {
    draft.tag = suid.randomUUID(6);
  });

  const invoice = await db.invoice.create({
    data,
  });

  return NextResponse.json(invoice);
}
