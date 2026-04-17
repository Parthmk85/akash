import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Video from '@/models/Video';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(videos);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to fetch videos: ${msg}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = verifyToken(request);
  if (!auth.valid) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    await dbConnect();
    const body = await request.json();
    const video = await Video.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create video';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
