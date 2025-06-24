import { defineConfig } from 'vite';
import * as path from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    dts(),
    visualizer({
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-hook-form',
        '@hookform/resolvers/zod',
        'zod',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'react-hook-form': 'ReactHookForm',
          '@hookform/resolvers/zod': 'HookFormResolversZod',
          zod: 'Zod',
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
      format: {
        comments: false,
      },
    },
    cssCodeSplit: false,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
});
