// import { fileURLToPath, URL } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      // setupFiles: [fileURLToPath(new URL('./src/setupTests.js', import.meta.url))],
      setupFiles: ['src/setupTests.js'],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,jsx,vue}']
      }
    }
  })
);
