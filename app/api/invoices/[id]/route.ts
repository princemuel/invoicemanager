import { getUser } from '@/app/lib/get-user';
import db from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: IParams }) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new ReferenceError('This invoice id is not valid');
  }

  const invoice = db.invoice.findFirstOrThrow({
    where: { id, userId: user.id },
  });

  return NextResponse.json(invoice);
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new ReferenceError('This invoice id is not valid');
  }

  const body = await request.json();

  const data = await db.invoice.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new ReferenceError('This invoice id is not valid');
  }

  const data = await db.invoice.delete({
    where: { id },
    select: { id: true },
  });

  return NextResponse.json(data);
}
