import db from '@/app/database';
import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function PUT(request: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new createHttpError.BadRequest(
      `Malformed data. Expected 'string' Got ${id}`
    );
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
  const session = await getAuthSession();

  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new createHttpError.BadRequest(
      `Malformed data. Expected 'string' Got ${id}`
    );
  }

  const body: InvoiceType = await request.json();

  const data = await db.invoice.update({
    where: { id },
    data: {
      status: body?.status,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: IParams }
) {
  const { id } = params;

  const session = await getAuthSession();

  if (!id || typeof id !== 'string') {
    throw new createHttpError.BadRequest(
      `Malformed data. Expected 'string' Got ${id}`
    );
  }

  const data = await db.invoice.delete({
    where: { id },
  });

  return NextResponse.json({
    message: `Invoice '#${data.tag}' deleted`,
  });
}
