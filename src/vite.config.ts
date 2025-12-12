import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
      // Use automatic JSX runtime
      jsxRuntime: 'automatic',
      // Babel config for optimizations
      babel: {
        plugins: [
          // Remove console.log in production
          ['transform-remove-console', { exclude: ['error', 'warn'] }],
        ],
      },
    }),
    // Gzip compression for all static assets
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression (better than gzip, supported by modern browsers)
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate sourcemaps for debugging (disable in production)
    sourcemap: false,
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        pure_funcs: ['console.log', 'console.info'],
        // Advanced optimizations
        passes: 2,
      },
      mangle: {
        // Mangle variable names for smaller file size
        safari10: true,
      },
      format: {
        // Remove comments
        comments: false,
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React vendor chunk
          'react-vendor': ['react', 'react-dom'],
          // Motion vendor chunk
          'motion-vendor': ['motion/react'],
          // Icons vendor chunk
          'icons-vendor': ['lucide-react'],
        },
        // Asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          // Organize assets by type
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // Entry file names
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Target modern browsers for smaller bundle size
    target: 'es2015',
    
    // Optimize CSS
    cssMinify: true,
    
    // Report compressed size
    reportCompressedSize: true,
  },
  
  // Server options for development
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Preview options
  preview: {
    port: 4173,
    open: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion/react', 'lucide-react'],
    exclude: [],
  },
  
  // Base public path
  base: './',
});
