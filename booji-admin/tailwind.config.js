module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 移除tailwindcss预设样式，否则与antd样式冲突
  },
};
