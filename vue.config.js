const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const { VantResolver } = require("@vant/auto-import-resolver");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const isPreOrPrd = process.env.VUE_APP_NODE_ENV === "pre" || process.env.VUE_APP_NODE_ENV === "prod";
const isDev = process.env.VUE_APP_NODE_ENV === "dev";

function resolve(dir) {
  return path.join(__dirname, dir);
}
const productionPlugins = [
  new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        comments: false // 去掉注释
      },
      warnings: false,
      compress: {
        drop_console: true,
        drop_debugger: false,
        pure_funcs: ["console.log"] //移除console
      }
    }
  }),
  new CompressionWebpackPlugin({
    filename: "[path][base].gz",
    algorithm: "gzip",
    test: /\.js$|\.json$|\.css/,
    threshold: 10240, // 只有大小大于该值的资源会被处理
    minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
    // deleteOriginalAssets: true // 删除原文件
  })
];
module.exports = defineConfig({
  devServer: {
    host: "localhost",
    port: 9000,
    https: false, // https:{type:Boolean}
    open: true,
    proxy: {
      "/api": {
        target: "http://dev.aabb.cn:8082/", //目标主机
        ws: true, //代理的WebSockets
        changeOrigin: true,
        pathRewrite: {
          //pathRewrite方法重写url
          "^/api": "/"
        }
      }
    }
  },
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: isDev,
  // css相关配置
  css: {
    extract: false,
    sourceMap: false
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.module.rule("svg").exclude.add(path.resolve(__dirname, "./src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/) // 匹配svg文件
      .include.add(path.resolve(__dirname, "./src/assets/icons"))
      .end()
      .use("svg-sprite")
      .loader("svg-sprite-loader") // 使用的loader，主要要npm该插件
      .options({ symbolId: "icon-[name]" })
      .end(); // 参数配置
  },
  configureWebpack: config => {
    config.resolve = {
      ...config.resolve,
      alias: {
        "@": resolve("src"),
        "/#/": resolve("types")
      }
    };
    config.plugins.push(ComponentsPlugin.default({ resolvers: [VantResolver()] }));
    if (isPreOrPrd) {
      // 公共代码抽离
      config.optimization = {
        splitChunks: {
          // 分割代码块
          cacheGroups: {
            vendor: {
              //第三方库抽离
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数
              maxInitialRequests: 5,
              minSize: 0, // 大于0个字节
              priority: 100 //权重
            },
            common: {
              //公用模块抽离
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0, // 大于0个字节
              priority: 60
            },
            styles: {
              //样式抽离
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              minChunks: 2,
              reuseExistingChunk: true,
              enforce: true
            },
            runtimeChunk: {
              name: "manifest"
            }
          }
        }
      };
      config.plugins.push(...productionPlugins);
    }
  }
});
