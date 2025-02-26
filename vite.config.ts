
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core';
            }
            if (id.includes('@radix-ui')) {
              const componentName = id.split('@radix-ui/')[1]?.split('/')[0];
              return `ui-${componentName}`;
            }
            if (id.includes('lucide-react')) {
              const iconName = id.split('lucide-react/dist/')[1]?.split('.')[0];
              return iconName ? `icon-${iconName}` : 'icons-core';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            return 'vendor';
          }
          if (id.includes('/components/')) {
            const componentType = id.split('/components/')[1]?.split('/')[0];
            return `component-${componentType}`;
          }
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1]?.split('.')[0];
            return `page-${pageName}`;
          }
          if (id.includes('/hooks/')) {
            return 'hooks';
          }
          if (id.includes('/lib/')) {
            return 'utils';
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
        passes: 5,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 250,
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    sourcemap: false
  }
}));
