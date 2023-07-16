import db from '@/app/database';
import { objectKeys } from '@/lib';
import createHttpError from 'http-errors';
import { produce } from 'immer';
import { NextResponse } from 'next/server';
import ShortUniqueId from 'short-unique-id';
import { getAuthSession } from '../auth/[...nextauth]/options';

const suid = new ShortUniqueId({
  dictionary: 'hex',
});

export async function POST(request: Request) {
  const session = await getAuthSession();

  const body: InvoiceTypeSafe = await request.json();

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
