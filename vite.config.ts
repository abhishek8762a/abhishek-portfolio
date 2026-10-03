import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// List every file in public/images at build time, so the site only requests images
// that really exist (no 404s in the console). Drop a file in, rebuild — it appears.
function listImages(dir = 'public/images'): string[] {
  try {
    return readdirSync(dir).flatMap((f) => {
      const full = join(dir, f);
      return statSync(full).isDirectory() ? listImages(full) : [relative('public', full).split('\\').join('/')];
    });
  } catch {
    return [];
  }
}

// Optional sub-path hosting: set BASE_PATH (defaults to the site root).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  define: {
    __IMAGE_FILES__: JSON.stringify(listImages()),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          charts: ['recharts'],
        },
      },
    },
  },
});
