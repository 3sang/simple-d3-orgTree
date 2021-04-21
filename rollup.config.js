import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import image from 'rollup-plugin-img';
import postcss from 'rollup-plugin-postcss';

import nested from "postcss-nested";   // css可嵌套
import cssnext from "postcss-cssnext"; // 支持最新的css规则
import cssnano from "cssnano";         // 压缩css

export default {
  input: './src/index.js',
  output: [
    { file: './dist/lib/orgTree.js', format: 'cjs' },
    { file: './dist/es/orgTree.js', format: 'esm' },
  ],
  globals: {
    react: 'react', // 指明 global.react 即是外部依赖 react
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'  // 排除node_modules 下的文件
    }),
    resolve(), // 这样 Rollup 能找到npm安装的modules并把所需打包
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    image({
      limit: 10000,
    }),
    postcss({
      extensions: [".less", ".css"],
      plugins: [nested(), cssnext({ warnForDuplicates: false }), cssnano()],
    }),
  ],
  external: ['react',"lodash"],
};
