const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const { VantResolver } = require("@vant/auto-import-resolver");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  devServer: {
    host: "localhost",
    port: 9000,
    https: false, // https:{type:Boolean}
    open: true
    // proxy: {
    //   "/api": {
    //     target: "", //目标主机
    //     ws: true, //代理的WebSockets
    //     changeOrigin: true,
    //   },
    //   "/api2": {
    //     target: "",
    //   },
    // }
  },
  transpileDependencies: true,
  lintOnSave: process.env.VUE_APP_NODE_ENV === "development",
  chainWebpack: function (config) {
    config.module.rule("svg").exclude.add(path.resolve(__dirname, "./src/assets/icons")).end();
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "/#/": resolve("types")
      }
    },
    plugins: [ComponentsPlugin.default({ resolvers: [VantResolver()] })],
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "svg-sprite-loader",
          include: path.resolve(__dirname, "./src/assets/icons"),
          options: { symbolId: "icon-[name]" }
        }
      ]
    }
  }
});
