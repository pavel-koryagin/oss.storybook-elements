import { defineConfig } from 'tsdown';

// Build the public API and copy the stylesheet without changing the source files
export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  dts: true,
  copy: {
    from: 'src/StorybookDecorator.css',
    to: 'dist',
  },
});
