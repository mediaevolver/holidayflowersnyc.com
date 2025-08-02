import { NextRequest, NextResponse } from 'next/server';

// Handle CORS and OPTIONS requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Simple password check - in production, use environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    console.log('Admin password check:', { 
      provided: password, 
      expected: adminPassword,
      envSet: !!process.env.ADMIN_PASSWORD 
    });
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}