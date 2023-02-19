import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      // include template compiler
      vue: 'vue/dist/vue.esm.browser.js',
    },
  },
  plugins: [vue()],
});
