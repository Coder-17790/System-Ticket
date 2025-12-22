import { defineConfig, loadEnv } from 'vite'; // Import loadEnv
import path from 'path';
import react from '@vitejs/plugin-react';

// Khai báo một hàm để lấy biến môi trường
// Đối số 'mode' sẽ là 'development' hoặc 'production'
export default defineConfig(({ mode }) => {
  // 1. Tải biến môi trường (từ .env, .env.development, v.v.)
  const env = loadEnv(mode, process.cwd(), '');

  // env.VITE_BACKEND_URL sẽ có giá trị chính xác
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:3000'; // Đặt fallback nếu cần

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@theme': path.resolve(__dirname, './src/theme'),
        '@api': path.resolve(__dirname, './src/api'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@locales': path.resolve(__dirname, './src/locales'),
        '@providers': path.resolve(__dirname, './src/providers'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@store': path.resolve(__dirname, './src/store'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@types': path.resolve(__dirname, './src/types'),
        '@features': path.resolve(__dirname, './src/features'),
      },
    },
    server: {
      proxy: {
        '/api': {
          // 2. Sử dụng biến đã tải
          target: backendUrl,
          // target: import.meta.env.VITE_BACKEND_URL, // Dòng này giờ sẽ bị loại bỏ
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
