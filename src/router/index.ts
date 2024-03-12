import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { staticRouter } from "./staticRouter";
const mode = process.env.VUE_APP_ROUTER_MODE;

const routerMode = {
  history: createWebHistory,
  hash: createWebHashHistory
};

const router = createRouter({
  history: routerMode[mode as keyof typeof routerMode](),
  routes: staticRouter,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  console.warn("路由错误", error.message);
});
export default router;
