import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    adminPasswordValue: process.env.ADMIN_PASSWORD ? '[SET]' : '[NOT SET]',
    defaultPassword: 'admin123',
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}