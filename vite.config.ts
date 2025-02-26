
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for major dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              // Split Radix UI components into separate chunks
              const componentName = id.split('@radix-ui/')[1]?.split('/')[0];
              return `radix-${componentName}`;
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'react-query';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            return 'vendor';
          }
          // Split application code into features
          if (id.includes('/components/')) {
            if (id.includes('/ui/')) {
              return 'ui-components';
            }
            if (id.includes('/deck/')) {
              return 'deck-features';
            }
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 3
      },
      mangle: {
        properties: false
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    sourcemap: false
  }
}));
