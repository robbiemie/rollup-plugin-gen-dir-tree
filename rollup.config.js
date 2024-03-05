import myExamplePlugin from './rollup-plugin-gen-dir-tree.js';

export default {
  input: 'src/index.js', // 入口文件
  output: {
    file: 'dist/bundle.js', // 输出文件
    format: 'esm', // 输出格式
  },
  plugins: [
    myExamplePlugin() // 使用你的插件
  ]
};