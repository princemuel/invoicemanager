import db from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as AuthFormData;

  let { email, name, password } = body;

  email = email.toLowerCase();
  password = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json(user);
}
