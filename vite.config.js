import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // GitHub Pages用のbase pathは本番ビルド時のみ適用
  const base = command === 'build' && mode === 'production'
    ? '/my-playground-chartjs/'
    : '/'

  return {
    base,
    root: '.',
    build: {
      outDir: 'dist',
    }
  }
})
