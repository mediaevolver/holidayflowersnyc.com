import { NextRequest, NextResponse } from 'next/server';
import { plants } from '@/data/plants';
import { orchids } from '@/data/orchids';
import { seasonalItems } from '@/data/seasonal';
import { rentals } from '@/data/rentals';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let products;
    switch (category) {
      case 'plants':
        products = plants;
        break;
      case 'orchids':
        products = orchids;
        break;
      case 'seasonal':
        products = seasonalItems;
        break;
      case 'rentals':
        products = rentals;
        break;
      default:
        // Return all products with category labels
        products = {
          plants: plants,
          orchids: orchids,
          seasonal: seasonalItems,
          rentals: rentals
        };
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}