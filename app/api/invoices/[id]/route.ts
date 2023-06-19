import { getUser } from '@/app/lib/get-user';
import db from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: IParams }) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new ReferenceError('This invoice id is not valid');
  }

  const body: InvoiceType = await request.json();

  const data = await db.invoice.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(data);
}

// just testing this: PATCH OR PUT
export async function PATCH(request: Request, { params }: { params: IParams }) {
  const user = await getUser();
  if (!user) return NextResponse.error();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new ReferenceError('This invoice id is not valid');
  }

  const body: InvoiceType = await request.json();

  const data = await db.invoice.update({
    where: { id },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { id } = params;

  const user = await getUser();
  if (!user) return NextResponse.error();

  if (!id || typeof id !== 'string') {
    throw new ReferenceError('This invoice id is not valid');
  }

  const data = await db.invoice.delete({
    where: { id },
  });

  return NextResponse.json({
    message: `Invoice '#${data.tag}' deleted`,
  });
}
