export interface SeasonalItem {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  season: string;
  featured?: boolean;
}

export const seasonalItems: SeasonalItem[] = [
  {
    id: 'pink-hyacinth-wooden-box',
    name: 'Pink Hyacinth in Wooden Box',
    image: 'l_71753A5D-BB67-4005-B753-D270DA6E5AFD.jpeg',
    description: 'Beautiful pink hyacinth bulbs arranged in an elegant wooden box planter',
    category: 'hyacinth',
    season: 'spring',
    featured: true
  },
  {
    id: 'red-amaryllis-glass',
    name: '3 Red Amaryllis in Glass',
    image: 'l_6846CF9D-B503-47A5-A957-54DBFE90A731.jpeg',
    description: 'Three stunning red amaryllis flowers arranged in a clear glass container',
    category: 'amaryllis',
    season: 'winter',
    featured: true
  },
  {
    id: 'blue-hyacinth-wooden-box',
    name: 'Blue Hyacinth in Wooden Box',
    image: 'l_C3CFF71C-78D7-4AD9-821E-38FD5B0EA8EB.jpeg',
    description: 'Vibrant blue hyacinth bulbs beautifully displayed in a rustic wooden box',
    category: 'hyacinth',
    season: 'spring',
    featured: true
  },
  {
    id: 'red-amaryllis-clay',
    name: '3 Red Amaryllis in Clay',
    image: 'l_53E7F5F9-AB02-4442-B8AF-33B62B03897F.jpeg',
    description: 'Three bold red amaryllis flowers in a natural clay pot arrangement',
    category: 'amaryllis',
    season: 'winter'
  },
  {
    id: 'paper-white-clay',
    name: '8" Paper White in Clay',
    image: 'l_B17C9288-0967-40AE-BF35-5A88A6E2FFE0.jpeg',
    description: 'Delicate paper white narcissus in a natural clay pot, perfect for winter blooms',
    category: 'paperwhite',
    season: 'winter'
  },
  {
    id: 'white-amaryllis-gold-pots',
    name: '5 White Amaryllis in Gold Pots',
    image: 'l_7C387CEE-4BC5-418E-AB59-A70740D6ED4B.jpeg',
    description: 'Five elegant white amaryllis flowers in luxurious gold-colored pots',
    category: 'amaryllis',
    season: 'winter',
    featured: true
  }
];

export const seasonalCategories = [
  { id: 'all', name: 'All Seasonal', count: seasonalItems.length },
  { id: 'amaryllis', name: 'Amaryllis', count: seasonalItems.filter(item => item.category === 'amaryllis').length },
  { id: 'hyacinth', name: 'Hyacinth', count: seasonalItems.filter(item => item.category === 'hyacinth').length },
  { id: 'paperwhite', name: 'Paper White', count: seasonalItems.filter(item => item.category === 'paperwhite').length }
];

export const seasonalSeasons = [
  { id: 'all', name: 'All Seasons', count: seasonalItems.length },
  { id: 'spring', name: 'Spring', count: seasonalItems.filter(item => item.season === 'spring').length },
  { id: 'winter', name: 'Winter', count: seasonalItems.filter(item => item.season === 'winter').length }
]; 