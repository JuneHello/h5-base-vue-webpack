import { createApp } from "vue";
// vue Router
import router from "@/router";
// pinia
import pinia from "@/stores";
// 按需引入组件样式 vant css
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";
import VConsole from "vconsole";
// custom directives
import directives from "./directives";
import App from "./App.vue";
import componentsvgPlugin from "@/components/SvgIcon/svgPlugin";

const app = createApp(App);
app.use(directives).use(componentsvgPlugin).use(router).use(pinia).mount("#app");

// 非生产环境开vconsole调试
const env = process.env.VUE_APP_NODE_ENV;
if (env !== "prod") {
  new VConsole();
}
