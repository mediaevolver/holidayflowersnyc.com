#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const deploymentTypes = {
  local: {
    assetPrefix: '',
    basePath: '',
    description: 'Local development build'
  },
  production: {
    assetPrefix: 'https://mediaevolver.com/holidayflowers',
    basePath: '/holidayflowers',
    description: 'Production deployment to mediaevolver.com/holidayflowers'
  },
  'custom-domain': {
    assetPrefix: process.env.CUSTOM_DOMAIN || 'https://yourdomain.com',
    basePath: '',
    description: 'Custom domain deployment'
  }
};

function main() {
  const deployType = process.argv[2];
  
  if (!deployType || !deploymentTypes[deployType]) {
    console.log('Usage: node scripts/deploy.js <deployment-type>');
    console.log('\nAvailable deployment types:');
    Object.entries(deploymentTypes).forEach(([key, config]) => {
      console.log(`  ${key}: ${config.description}`);
    });
    process.exit(1);
  }

  const config = deploymentTypes[deployType];
  
  console.log(`\n🚀 Building for ${config.description}...`);
  console.log(`   Asset Prefix: ${config.assetPrefix || '(none)'}`);
  console.log(`   Base Path: ${config.basePath || '(none)'}\n`);

  // Set environment variables for this build
  process.env.NEXT_PUBLIC_ASSET_PREFIX = config.assetPrefix;
  process.env.NEXT_PUBLIC_BASE_PATH = config.basePath;

  try {
    // Run the build
    execSync(`NEXT_PUBLIC_ASSET_PREFIX="${config.assetPrefix}" NEXT_PUBLIC_BASE_PATH="${config.basePath}" npm run build`, {
      stdio: 'inherit',
      env: { ...process.env }
    });

    console.log(`\n✅ Build completed successfully!`);
    
    if (deployType === 'production') {
      console.log(`\n📁 Deploy the 'out' folder to your cPanel hosting.`);
      console.log(`   Upload contents to: /public_html/holidayflowers/`);
    } else if (deployType === 'local') {
      console.log(`\n📁 Local build ready in 'out' folder.`);
      console.log(`   Serve with: npx serve out`);
    }
    
  } catch (error) {
    console.error(`\n❌ Build failed:`, error.message);
    process.exit(1);
  }
}

main(); 