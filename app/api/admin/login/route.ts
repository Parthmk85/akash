import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (username !== adminUsername) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // For simplicity use plain comparison; in prod, store hashed password
    const valid = password === adminPassword;
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ username, role: 'admin' });
    return NextResponse.json({ token, username });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
