import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  esbuild: {
    jsxFactory: 'PsJsx.createElement',
    jsxFragment: 'PsJsx.createFragment',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        help: resolve(__dirname, 'help.html'),
        about: resolve(__dirname, 'about.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    sourcemap: true,
  },
  server: {
    port: 8080,
    open: true,
  },
});
