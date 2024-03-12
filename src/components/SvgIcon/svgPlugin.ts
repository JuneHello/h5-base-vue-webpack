//引入svgicon组件
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

const componentsvgPlugin: any = {
  install: function (app: any) {
    // 全量引入svg图标
    if (process.env.VITE) {
      const ctx = import.meta.glob("@/assets/icons/*.svg", { eager: true });
      Object.keys(ctx).forEach(key => {
        ctx[key];
      });
    } else {
      // 全量引入svg图标
      const ctx = require.context("@/assets/icons", false, /\.svg$/);
      ctx.keys().forEach(path => {
        const temp = path.match(/\.\/([A-Za-z0-9\-_]+)\.svg$/);
        if (!temp) return;
        const name = temp[1];
        require(`@/assets/icons/${name}.svg`);
      });
    }
    app.component("SvgIcon", SvgIcon);
  }
};
export default componentsvgPlugin;
