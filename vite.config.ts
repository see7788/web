// require("qingwa")();//让console有行号
import { defineConfig, normalizePath, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import htmlConfig from 'vite-plugin-html-config';
import tsconfigPaths from 'vite-tsconfig-paths'
import { VITE_define_t } from "./VITE_define"
import os from 'os';
import fs from "fs"
import path from "path"
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
  const tsxpath = normalizePath(path.resolve(process.cwd(), mode))
  // console.log("----------",command, tsxpath,loadEnv(mode, process.cwd(), ''))
  if (!fs.existsSync(tsxpath)) {
    throw new Error(`!fs.existsSync(tsxPath) pnpm run dev --mode 带有.tsx的文件`);
  }
  const VITE_define: VITE_define_t = {
    a: 1
  }
  return {
    server: {
      host: getLocalIPv4(),
      open: true
    },
    define: {
      VITE_define: VITE_define
    },
    plugins: [
      tsconfigPaths(),
      react(),
      htmlConfig({
        title: mode,
        scripts: [
          {
            type: 'module',
            src: normalizePath(mode),
          },
        ],
      })],
    build: {
      minify: "terser",//清理垃圾
      terserOptions: {
        compress: {
          drop_console: true,//清console
          drop_debugger: true,//清debugger
        },
      },
      emptyOutDir: true,//打包前清空
      assetsDir: './',
      sourcemap: false,
      rollupOptions: {
        //input: './src/mcu00_server/main.ts',
        output: {
          entryFileNames: '[name][hash:6].js',
          chunkFileNames: '[name][hash:6].js',
          assetFileNames: '[name][hash:6].[ext]',
        },
      },
    },
  }
})
