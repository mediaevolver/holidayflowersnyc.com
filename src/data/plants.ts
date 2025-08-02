export interface Plant {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  category: 'succulents' | 'ficus' | 'tropical' | 'topiary' | 'flowering';
  price?: number;
  inStock: boolean;
  featured?: boolean;
}

export const plants: Plant[] = [
  // Page 1 Products
  {
    id: 286,
    name: "SUCCULENTS ARRANGEMENT IN A WHITE RECTANGULAR POT",
    slug: "succulents-white-rectangular-pot",
    image: "l_IMG_3624.jpeg",
    description: "Beautiful arrangement of various succulents in an elegant white rectangular planter",
    category: "succulents",
    inStock: true,
    featured: true,
  },
  {
    id: 229,
    name: "Glauca plants",
    slug: "glauca-plants",
    image: "l_7A98780B-8CA5-4B0D-A01E-75A8AF788F42.jpeg",
    description: "Striking blue-green foliage plants perfect for modern interiors",
    category: "tropical",
    inStock: true,
  },
  {
    id: 227,
    name: "Ficus Audrey",
    slug: "ficus-audrey",
    image: "l_B4058832-93FC-4707-9D3D-E857D04B0FF7.jpeg",
    description: "Trendy Ficus Benghalensis with broad, velvety leaves",
    category: "ficus",
    inStock: true,
    featured: true,
  },
  {
    id: 200,
    name: "Succulent arrangement square pot",
    slug: "succulent-square-pot",
    image: "l_5277902E-2603-4A3F-9A1C-60EB60C83EE0.jpeg",
    description: "Compact succulent arrangement in a modern square planter",
    category: "succulents",
    inStock: true,
  },
  {
    id: 259,
    name: "Anthurium hookahrai",
    slug: "anthurium-hookahrai",
    image: "l_2123E400-DE1D-41E3-B72B-1BAF9A643ECE.jpeg",
    description: "Exotic anthurium with distinctive hooked leaves",
    category: "tropical",
    inStock: true,
  },
  {
    id: 236,
    name: "Succulent in hand made wooden pot",
    slug: "succulent-wooden-pot",
    image: "l_A4441C8F-CFC1-4F1F-B2F7-525556210AB8.jpeg",
    description: "Artisanal wooden planter with carefully selected succulents",
    category: "succulents",
    inStock: true,
  },
  {
    id: 287,
    name: "Ficus moclame",
    slug: "ficus-moclame",
    image: "l_9F27A891-2D98-4FB6-B0A4-A63EEDA37AF3.jpeg",
    description: "Compact ficus variety with glossy green leaves",
    category: "ficus",
    inStock: true,
  },
  {
    id: 288,
    name: "Oranges plant",
    slug: "oranges-plant",
    image: "l_D1E32E7C-1426-45C3-B113-37D1768EAB66.jpeg",
    description: "Decorative citrus plant with vibrant orange fruits",
    category: "tropical",
    inStock: true,
  },

  // Page 2 Products
  {
    id: 42,
    name: "dracaena margianata",
    slug: "dracaena-margianata",
    image: "l_Picture 085.jpg",
    description: "Classic dragon tree with thin, arching leaves edged in red",
    category: "tropical",
    inStock: true,
  },
  {
    id: 56,
    name: "ficus lyrata",
    slug: "ficus-lyrata",
    image: "l_Picture 153.jpg",
    description: "Popular fiddle leaf fig with large, violin-shaped leaves",
    category: "ficus",
    inStock: true,
    featured: true,
  },
  {
    id: 51,
    name: "janet craig Lisa",
    slug: "janet-craig-lisa",
    image: "l_Picture 151.jpg",
    description: "Variegated dracaena with cream and green striped foliage",
    category: "tropical",
    inStock: true,
  },
  {
    id: 76,
    name: "single ball martyle topiary",
    slug: "single-ball-topiary",
    image: "l_100_0544.JPG",
    description: "Elegantly shaped single sphere topiary for formal settings",
    category: "topiary",
    inStock: true,
  },
  {
    id: 35,
    name: "spathiphyllum(peace lily)",
    slug: "spathiphyllum-peace-lily",
    image: "l_Picture 058.jpg",
    description: "Classic peace lily with white blooms and dark green foliage",
    category: "flowering",
    inStock: true,
  },
  {
    id: 41,
    name: "pothos on bark",
    slug: "pothos-on-bark",
    image: "l_Picture 084.jpg",
    description: "Trailing pothos trained on natural bark support",
    category: "tropical",
    inStock: true,
  },
  {
    id: 77,
    name: "martyl topiary",
    slug: "martyl-topiary",
    image: "l_100_0545.JPG",
    description: "Multi-tiered topiary with precise geometric shaping",
    category: "topiary",
    inStock: true,
  },
  {
    id: 52,
    name: "philodendron selloum",
    slug: "philodendron-selloum",
    image: "l_Picture 148.jpg",
    description: "Large philodendron with deeply lobed, tropical leaves",
    category: "tropical",
    inStock: true,
  },

  // Additional Products for More Variety
  {
    id: 289,
    name: "succulent in gold pot",
    slug: "succulent-gold-pot",
    image: "l_succulent in gold pot.jpg",
    description: "Elegant succulent arrangement in a luxurious gold planter",
    category: "succulents",
    inStock: true,
  },
  {
    id: 290,
    name: "succulent arrangement in wooden box",
    slug: "succulent-wooden-box",
    image: "l_succulent arrangment in wooden box.jpg",
    description: "Rustic wooden box filled with diverse succulent varieties",
    category: "succulents",
    inStock: true,
  },
  {
    id: 291,
    name: "succulent in white pot",
    slug: "succulent-white-pot",
    image: "l_succulant in white pot.jpg",
    description: "Single succulent specimen in clean white ceramic pot",
    category: "succulents",
    inStock: true,
  },
  {
    id: 292,
    name: "succulent pot collection",
    slug: "succulent-pot-collection",
    image: "l_succulant pot.jpg",
    description: "Charming succulent in decorative terra cotta style pot",
    category: "succulents",
    inStock: true,
  },
];

export const categories = [
  { id: 'all', name: 'All Plants', count: plants.length },
  { id: 'succulents', name: 'Succulents', count: plants.filter(p => p.category === 'succulents').length },
  { id: 'ficus', name: 'Ficus', count: plants.filter(p => p.category === 'ficus').length },
  { id: 'tropical', name: 'Tropical', count: plants.filter(p => p.category === 'tropical').length },
  { id: 'topiary', name: 'Topiary', count: plants.filter(p => p.category === 'topiary').length },
  { id: 'flowering', name: 'Flowering', count: plants.filter(p => p.category === 'flowering').length },
];

export const featuredPlants = plants.filter(plant => plant.featured); 