import { getUser } from '@/app/lib/get-user';
import db from '@/app/lib/prisma';
import { objectKeys } from '@/lib';
import { produce } from 'immer';
import { NextResponse } from 'next/server';
import ShortUniqueId from 'short-unique-id';

const suid = new ShortUniqueId({
  dictionary: 'hex',
});

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const invoices = db.invoice.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const body = (await request.json()) as InvoiceType;
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
