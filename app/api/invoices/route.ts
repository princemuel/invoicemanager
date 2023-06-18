import { getUser } from '@/app/lib/get-user';
import db from '@/app/lib/prisma';
import { objectKeys } from '@/lib';
import { produce } from 'immer';
import { NextResponse } from 'next/server';
import ShortUniqueId from 'short-unique-id';

const suid = new ShortUniqueId({
  dictionary: 'hex',
});

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const body: InvoiceType = await request.json();
  for (const value of objectKeys(body)) {
    if (!body[value]) return NextResponse.error();
  }

  const data = produce(body, (draft) => {
    draft.tag = suid.randomUUID(6);
  });

  const invoice = await db.invoice.create({
    data,
  });

  return NextResponse.json(invoice);
}
