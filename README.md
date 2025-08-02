# Holiday Flowers NYC - Next.js Website

A modern, responsive website for Holiday Flowers NYC built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌸 Beautiful plant and orchid catalog with 50+ products
- 🛒 Shopping cart functionality with local storage
- 🔍 Advanced search and filtering capabilities  
- 🖼️ Lightbox gallery with image zoom and navigation
- 📱 Fully responsive design with smooth animations
- 🎨 Modern UI with shadcn/ui components
- ⚡ Static site generation for optimal performance

## Configurable Asset Management

This project supports flexible asset URL configuration for different deployment scenarios:

### Environment Configuration

Create a `.env.local` file with your deployment configuration:

```bash
# Production deployment (cPanel subdirectory)
NEXT_PUBLIC_ASSET_PREFIX=https://mediaevolver.com/holidayflowers
NEXT_PUBLIC_BASE_PATH=/holidayflowers

# Local development  
# NEXT_PUBLIC_ASSET_PREFIX=
# NEXT_PUBLIC_BASE_PATH=

# Custom domain
# NEXT_PUBLIC_ASSET_PREFIX=https://yourdomain.com
# NEXT_PUBLIC_BASE_PATH=
```

### Build Scripts

Different build configurations for various deployment scenarios:

#### **For Vercel Deployment (with CMS/Admin features):**
```bash
# Standard Vercel build (enables API routes for admin functionality)
npm run build:vercel
```

#### **For Static Hosting (cPanel, Netlify, GitHub Pages, etc.):**
```bash
# Local static build (no prefixing)
npm run build:static

# Production static build (mediaevolver.com/holidayflowers)
npm run build:static-production
```

**⚠️ Important**: The CMS admin features require server-side functionality and only work with Vercel deployment (`npm run build:vercel`). For static hosting, the admin panel will not function, but the main website will work perfectly.

### Deployment Script

Use the deployment script for automated builds:

```bash
# Build for production
node scripts/deploy.js production

# Build for local development
node scripts/deploy.js local

# Build for custom domain
CUSTOM_DOMAIN=https://yourdomain.com node scripts/deploy.js custom-domain
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd holidayflowersnyc.com
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── page.tsx        # Home page with hero carousel
│   ├── plants/         # Plants catalog page
│   ├── orchids/        # Orchids catalog page  
│   └── cart/           # Shopping cart page
├── components/
│   ├── plants/         # Plant-specific components
│   ├── orchids/        # Orchid-specific components
│   └── ui/             # Reusable UI components
├── data/
│   ├── plants.ts       # Plant catalog data
│   └── orchids.ts      # Orchid catalog data
└── lib/
    └── cart-context.tsx # Shopping cart state management

public/
└── images/
    ├── backgrounds/    # Hero background images
    ├── plants/         # Plant product images
    └── orchids/        # Orchid product images
```

## Deployment

### Production Deployment (cPanel)

1. **Build for production:**
   ```bash
   npm run build:production
   ```

2. **Upload to hosting:**
   - Upload contents of `out/` folder to `/public_html/holidayflowers/`
   - Ensure all images are in the correct subdirectories

### Custom Domain Deployment

1. **Set your domain:**
   ```bash
   CUSTOM_DOMAIN=https://yourdomain.com npm run build:custom-domain
   ```

2. **Deploy static files:**
   - Upload contents of `out/` folder to your web server
   - Configure your domain to serve the static files

## Asset URL Configuration

The asset system automatically handles:

- **CSS and JS files:** Prefixed with `assetPrefix` from config
- **Images:** All images use relative paths that get prefixed  
- **Navigation links:** Use `basePath` for proper routing
- **Build-time optimization:** Different builds for different environments

### Examples

**Local Development:**
```
Image: /images/plants/succulent.jpg
→ Resolves to: http://localhost:3000/images/plants/succulent.jpg
```

**Production Deployment:**
```
Image: /images/plants/succulent.jpg  
→ Resolves to: https://mediaevolver.com/holidayflowers/images/plants/succulent.jpg
```

**Custom Domain:**
```
Image: /images/plants/succulent.jpg
→ Resolves to: https://yourdomain.com/images/plants/succulent.jpg
```

## Development

### Adding New Products

1. Add product images to `public/images/plants/` or `public/images/orchids/`
2. Update product data in `src/data/plants.ts` or `src/data/orchids.ts`
3. Images will automatically use the configured asset prefix

### Styling

- Built with Tailwind CSS and shadcn/ui
- Custom animations with Framer Motion
- Responsive design with mobile-first approach

### Performance

- Static site generation with Next.js 14
- Optimized images with Next.js Image component  
- Minimal JavaScript bundle with code splitting
- Fast loading with prefetched assets

## Content Management System (CMS)

The site includes a built-in CMS for easy product management without requiring a database.

### Admin Access

1. **Login URL**: `/admin/login`
2. **Default Password**: `admin123` (change via `ADMIN_PASSWORD` environment variable)
3. **Dashboard**: `/admin`

### Features

- **Product Management**: Add, edit, and delete products across all categories
- **Image Upload**: Upload product images directly through the admin interface
- **Category Management**: Organize products by categories and tags
- **Inventory Status**: Mark products as in-stock or out-of-stock
- **Featured Products**: Highlight products on the homepage
- **Price Management**: Set prices for plants and rental rates for rental items

### How It Works

- **File-Based**: No database required - all data stored in TypeScript files
- **Real-Time Updates**: Changes immediately reflect on the live site
- **Image Storage**: Images uploaded to `/public/images/` directory
- **Type Safety**: All product data validated with TypeScript interfaces
- **Vercel Compatible**: Fully works with Vercel's serverless deployment

### Security

- Simple password-based authentication
- Admin routes protected with authentication middleware
- Environment variable configuration for production security

### Usage

1. Navigate to `/admin/login` and enter the admin password
2. Use the dashboard to manage products by category
3. Upload images and update product information
4. Changes are immediately saved to the data files
5. Redeploy to Vercel to see updates live

## License

Private project for Holiday Flowers NYC. 