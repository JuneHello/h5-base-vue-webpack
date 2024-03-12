<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed, CSSProperties, defineOptions } from "vue";
defineOptions({
  name: "SvgIcon"
});
interface SvgProps {
  name: string; // 图标的名称 ==> 必传
  prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
  color?: string;
  iconStyle?: CSSProperties; // 图标的样式 ==> 非必传
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: "icon",
  color: "#333",
  iconStyle: () => ({ width: "30px", height: "30px" })
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
