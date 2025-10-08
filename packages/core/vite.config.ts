import { defineConfig } from 'vite';
import * as path from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    dts({
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/demo/**'],
      insertTypesEntry: true,
    }),
    visualizer({
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
      template: 'treemap',
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
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
          'react/jsx-runtime': 'jsxRuntime',
          'react-hook-form': 'ReactHookForm',
          '@hookform/resolvers/zod': 'hookformResolvers',
          zod: 'Zod',
        },
        compact: true,
        generatedCode: {
          constBindings: true,
          objectShorthand: true,
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 2,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        dead_code: true,
        unused: true,
      },
      mangle: {
        safari10: false,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    chunkSizeWarningLimit: 100,
    reportCompressedSize: true,
    cssMinify: true,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    legalComments: 'none',
    target: 'es2020',
    supported: {
      'dynamic-import': true,
      'import-meta': true,
    },
  },
});
