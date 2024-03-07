## 一、项目描述

- 启动问题看 FAQ.md
- h5 项目按照 比例设计。
- 项目环境： at least Node.js v16.14

## 二、项目启动

- pnpm i -> pnpm run dev
- 打包测试：pnpm run build:test

## 三、vscode 请安装 Eslint prettier stylelint 插件

## 四、代码 commit 信息：

- commit 格式： <type>: <subject> ，subject 是 commit 的简短描述，不能超过 50 个字符，且结尾不加英文句号。
- 例如 git commit -m "feat: 新增功能";---(注意是双引号)，如果提交不上去，执行 pnpm i 重新安装下；
- 标准类型，看 commitlint.config.cjs 文件的 rules -> type-enum
  feat：新功能（feature）
  fix：修补 bug
  docs：文档（documentation）
  style： 格式方面的优化
  refactor：重构
  test：测试
  chore：构建过程或辅助工具的变动
  等等

- 代码提交前会自动进行 eslint/stylelint 检查，看对应的(\*.cjs)配置文件
