import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import htmlConfig from 'vite-plugin-html-config';
import tsconfigPaths from 'vite-tsconfig-paths'
import os from 'os';


// pnpm dev --mode src/main2.tsx
export default defineConfig(({ command, mode }) => {
  function getLocalIPv4() {
    const interfaces = os.networkInterfaces();
    for (const ifaceKey of Object.keys(interfaces)) {
      const iface = interfaces[ifaceKey];
      if (iface) {
        for (const config of iface) {
          if (config.family === 'IPv4' && !config.internal) {
            return config.address;
          }
        }
      }
    }
    return '127.0.0.1'; // 如果没有找到，返回本地回环地址
  }
  return {
    server: {
      host: getLocalIPv4(),
      open: true
    },
    plugins: [
      tsconfigPaths(),
      react(),
      htmlConfig({
        title: mode,
        scripts: [
          {
            type: 'module',
            src: mode,
          },
        ],
      })],
  }
})
