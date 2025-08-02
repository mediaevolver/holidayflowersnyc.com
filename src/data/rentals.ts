export interface Rental {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  size: string;
  featured: boolean;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  type: 'indoor' | 'outdoor' | 'topiary';
  care: string;
  minDuration: string;
}

export const rentals: Rental[] = [
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    description: 'Beautiful tropical areca palm perfect for events and corporate settings. Creates an elegant atmosphere with its feathery fronds.',
    image: '/images/l_pic2.jpg',
    category: 'Palm',
    size: '6-8 feet tall',
    featured: true,
    dailyRate: 45,
    weeklyRate: 250,
    monthlyRate: 800,
    type: 'indoor',
    care: 'Low maintenance, prefers bright indirect light',
    minDuration: '3 days'
  },
  {
    id: 'ficus-tree',
    name: 'Ficus Tree',
    description: 'Classic ficus tree ideal for offices, events, and home staging. Adds natural beauty and sophistication to any space.',
    image: '/images/l_pic3.jpg',
    category: 'Tree',
    size: '5-7 feet tall',
    featured: true,
    dailyRate: 40,
    weeklyRate: 220,
    monthlyRate: 750,
    type: 'indoor',
    care: 'Tolerates various light conditions, easy care',
    minDuration: '3 days'
  },
  {
    id: 'juniper-topiary',
    name: 'Juniper Topiary',
    description: 'Stunning 6-foot tall juniper topiary shaped to perfection. Perfect for upscale events, weddings, and formal occasions.',
    image: '/images/l_Picture 160.jpg',
    category: 'Topiary',
    size: '6 feet tall',
    featured: true,
    dailyRate: 75,
    weeklyRate: 400,
    monthlyRate: 1200,
    type: 'outdoor',
    care: 'Requires outdoor placement, regular watering',
    minDuration: '1 day'
  },
  {
    id: 'ivy-wall',
    name: 'Ivy Wall',
    description: 'Living ivy wall installation that creates a stunning natural backdrop. Perfect for photo shoots, events, and green wall displays.',
    image: '/images/l_Picture 111.jpg',
    category: 'Wall Installation',
    size: 'Custom sizing available',
    featured: true,
    dailyRate: 150,
    weeklyRate: 800,
    monthlyRate: 2500,
    type: 'indoor',
    care: 'Professional setup and maintenance included',
    minDuration: '1 day'
  }
];

export const rentalCategories = [
  { id: 'all', name: 'All Rentals', count: rentals.length },
  { id: 'Palm', name: 'Palms', count: rentals.filter(r => r.category === 'Palm').length },
  { id: 'Tree', name: 'Trees', count: rentals.filter(r => r.category === 'Tree').length },
  { id: 'Topiary', name: 'Topiaries', count: rentals.filter(r => r.category === 'Topiary').length },
  { id: 'Wall Installation', name: 'Wall Installations', count: rentals.filter(r => r.category === 'Wall Installation').length }
];

export const rentalTypes = [
  { id: 'all', name: 'All Types', count: rentals.length },
  { id: 'indoor', name: 'Indoor', count: rentals.filter(r => r.type === 'indoor').length },
  { id: 'outdoor', name: 'Outdoor', count: rentals.filter(r => r.type === 'outdoor').length },
  { id: 'topiary', name: 'Topiary', count: rentals.filter(r => r.type === 'topiary').length }
];

export const featuredRentals = rentals.filter(rental => rental.featured); 