import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { category, product, action } = await request.json();
    
    if (!category || !product) {
      return NextResponse.json({ error: 'Category and product data required' }, { status: 400 });
    }

    // Get the appropriate data file path
    let dataFilePath: string;
    let interfaceName: string;
    let arrayName: string;

    switch (category) {
      case 'plants':
        dataFilePath = join(process.cwd(), 'src/data/plants.ts');
        interfaceName = 'Plant';
        arrayName = 'plants';
        break;
      case 'orchids':
        dataFilePath = join(process.cwd(), 'src/data/orchids.ts');
        interfaceName = 'Orchid';
        arrayName = 'orchids';
        break;
      case 'seasonal':
        dataFilePath = join(process.cwd(), 'src/data/seasonal.ts');
        interfaceName = 'SeasonalItem';
        arrayName = 'seasonalItems';
        break;
      case 'rentals':
        dataFilePath = join(process.cwd(), 'src/data/rentals.ts');
        interfaceName = 'Rental';
        arrayName = 'rentals';
        break;
      default:
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    // Read the current file
    const currentContent = await readFile(dataFilePath, 'utf-8');
    
    // Parse the current data (this is a simplified approach)
    // In a production environment, you might want to use a proper AST parser
    const lines = currentContent.split('\n');
    
    // Find the array declaration
    const arrayStartIndex = lines.findIndex(line => line.includes(`export const ${arrayName}`));
    if (arrayStartIndex === -1) {
      return NextResponse.json({ error: 'Could not find array in file' }, { status: 500 });
    }

    // Simple approach: we'll re-import the data, modify it, and rewrite the file
    // This is not the most robust approach but works for our use case
    const dataModule = await import(`@/data/${category}`);
    const currentData = dataModule[arrayName];

    let updatedData;
    if (action === 'add') {
      updatedData = [...currentData, product];
    } else if (action === 'update') {
      updatedData = currentData.map((item: any) => 
        item.id === product.id ? { ...item, ...product } : item
      );
    } else if (action === 'delete') {
      updatedData = currentData.filter((item: any) => item.id !== product.id);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Generate the new file content
    const newFileContent = generateDataFileContent(interfaceName, arrayName, updatedData, category);
    
    // Write the updated file
    await writeFile(dataFilePath, newFileContent, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: `Product ${action}d successfully`,
      data: updatedData
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

function generateDataFileContent(interfaceName: string, arrayName: string, data: any[], category: string): string {
  // Generate TypeScript interface based on category
  let interfaceContent = '';
  
  switch (category) {
    case 'plants':
      interfaceContent = `export interface Plant {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  category: 'succulents' | 'ficus' | 'tropical' | 'topiary' | 'flowering';
  price?: number;
  inStock: boolean;
  featured?: boolean;
}`;
      break;
    case 'orchids':
      interfaceContent = `export interface Orchid {
  id: string;
  name: string;
  image: string;
  description: string;
  category: 'white' | 'purple' | 'mixed' | 'pink' | 'yellow' | 'colorful';
  featured?: boolean;
}`;
      break;
    case 'seasonal':
      interfaceContent = `export interface SeasonalItem {
  id: string;
  name: string;
  image: string;
  description: string;
  category: 'holiday' | 'spring' | 'summer' | 'fall' | 'winter';
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'holiday';
  featured?: boolean;
}`;
      break;
    case 'rentals':
      interfaceContent = `export interface Rental {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'event' | 'office' | 'wedding' | 'corporate';
  size: 'small' | 'medium' | 'large';
  featured?: boolean;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  type: 'plant' | 'arrangement' | 'display';
  care: 'low' | 'medium' | 'high';
  minDuration: number;
}`;
      break;
  }

  // Generate the data array content
  const dataContent = JSON.stringify(data, null, 2)
    .replace(/"/g, "'") // Use single quotes for consistency
    .replace(/'/g, "'"); // Ensure proper quote handling

  // Generate categories array if needed
  let categoriesContent = '';
  if (category === 'orchids') {
    categoriesContent = `
export const orchidCategories = ['white', 'purple', 'mixed', 'pink', 'yellow', 'colorful'] as const;`;
  } else if (category === 'seasonal') {
    categoriesContent = `
export const seasonalCategories = ['holiday', 'spring', 'summer', 'fall', 'winter'] as const;
export const seasonalSeasons = ['spring', 'summer', 'fall', 'winter', 'holiday'] as const;`;
  } else if (category === 'rentals') {
    categoriesContent = `
export const rentalCategories = ['event', 'office', 'wedding', 'corporate'] as const;
export const rentalTypes = ['plant', 'arrangement', 'display'] as const;`;
  }

  return `${interfaceContent}

export const ${arrayName}: ${interfaceName}[] = ${dataContent};${categoriesContent}
`;
}