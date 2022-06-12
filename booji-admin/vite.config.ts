import { defineConfig, ConfigEnv, UserConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import visualizer from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import vitePluginImp from "vite-plugin-imp";

import {
  VITE_APP_LEGACY,
  VITE_APP_ANALYZE,
  VITE_APP_COMPRESS_GZIP,
  VITE_BASE_PATH,
  VITE_DROP_CONSOLE,
} from "./src/config/constant";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";

  const plugins: PluginOption[] = [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style(name) {
            return `antd/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ];

  isBuild && VITE_APP_LEGACY && plugins.push(legacy());

  isBuild && VITE_APP_COMPRESS_GZIP && plugins.push(compression());

  VITE_APP_ANALYZE &&
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );

  return {
    base: VITE_BASE_PATH,
    plugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            antd: ["antd"],
            echarts: ["echarts"],
            recoil: ["recoil"],
          },
        },
      },
    },
    server: {
      host: true, // docker required
      port: 3000,
    },
  };
});
