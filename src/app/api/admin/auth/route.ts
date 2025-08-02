import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Auth POST request received');
  
  try {
    const body = await request.json();
    const { password } = body;
    
    console.log('Request body:', { password: password ? '[PROVIDED]' : '[MISSING]' });
    
    // Simple password check - in production, use environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    console.log('Password comparison:', { 
      provided: password,
      expected: adminPassword,
      match: password === adminPassword
    });
    
    if (password === adminPassword) {
      console.log('Authentication successful');
      return NextResponse.json({ success: true });
    } else {
      console.log('Authentication failed');
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}