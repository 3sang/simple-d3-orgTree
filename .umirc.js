const path = require('path');
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  },
  chainWebpack: function (config, { webpack }) {
    config.resolve.set('extensions', ['.js', '.json', '.less']);
  },
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Dodo',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
