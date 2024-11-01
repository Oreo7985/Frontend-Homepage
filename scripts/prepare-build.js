// scripts/prepare-build.js
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

async function prepareBuild() {
  try {
    // Create temporary build directory if it doesn't exist
    await mkdir('.vite-temp', { recursive: true });
    
    // Create a temporary rollup config
    const rollupConfig = `
      export default {
        external: [],
        output: {
          dir: 'dist',
          format: 'es'
        }
      }
    `;
    
    await writeFile(join('.vite-temp', 'rollup.config.js'), rollupConfig);
    
    console.log('Build preparation completed successfully');
  } catch (error) {
    console.error('Error preparing build:', error);
    process.exit(1);
  }
}

prepareBuild();