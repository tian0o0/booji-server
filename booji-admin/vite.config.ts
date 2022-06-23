import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import visualizer from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const { VITE_BASE_PATH, VITE_APP_LEGACY } = loadEnv(mode, process.cwd());

  const isBuild = command === "build";

  const plugins = [
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
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ];

  isBuild && VITE_APP_LEGACY === "true" && plugins.push(legacy());

  isBuild && plugins.push(compression());

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
          drop_console: true,
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
