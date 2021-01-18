import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import image from 'rollup-plugin-img';

export default {
  input:'./src/index.js',
  output:[
    {file:'./dist/lib/orgTree.js',format:'cjs'},
    {file:'./dist/es/orgTree.js',format:'esm'},
  ],
  globals: {
    "react": "react" // 指明 global.react 即是外部依赖 react
  },
  plugins:[
    babel(),
    resolve(),  // 这样 Rollup 能找到npm安装的modules并把所需打包
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    image({
      limit: 10000
    })
  ],
  external:['react']
}
