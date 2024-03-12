import { defineConfig, ConfigEnv, UserConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import htmlTemplate from "vite-plugin-html-template";
import EnvironmentPlugin from "vite-plugin-environment";
import eslintPlugin from "vite-plugin-eslint";
import { VantResolver } from "@vant/auto-import-resolver";
import Components from "unplugin-vue-components/vite";
import svgSprites from "rollup-plugin-svg-sprites";

function resolve(dir) {
  return path.join(__dirname, dir);
}

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    //本地运行配置，以及反向代理配置
    server: {
      host: "localhost",
      https: false, //是否启用 http 2
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      open: true, //服务启动时自动在浏览器中打开应用
      port: 9000,
      // 反向代理配置
      proxy: {
        "/api": {
          target: "https://xxxx.com/",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    define: {
      "process.env": {
        VITE: true
      }
    },
    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
      alias: {
        "@": resolve("src"),
        "/#/": resolve("types")
      }
    },
    plugins: [
      vue(),
      htmlTemplate(),
      EnvironmentPlugin("all", { prefix: "VUE_APP_" }),
      svgSprites({
        symbolId(filePath) {
          const paths = filePath.replace(/\\/g, "/").split("assets/icons/")[1].split("/");
          const fileName = paths?.pop()?.replace(".svg", "");
          return "icon-" + fileName;
        }
      }),
      Components({
        types: [],
        dts: true,
        resolvers: [VantResolver()]
      }),
      mode === "development" &&
        eslintPlugin({
          include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.vue", "src/**/*.tsx", "src/**/*.ts"],
          exclude: ["./node_modules/**"],
          cache: false
        })
    ]
  };
});
