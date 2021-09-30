const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require("path");
const { optimize } = require('webpack');

module.exports = {
  configureWebpack: (() => {
    if (process.env.NODE_ENV !== 'production') return {};
    if (Boolean(process.env.SSR)) {
      return {
        entry: '/src/ssr-main.js',
        target: 'node',
        devtool: 'source-map',
        output: {
          libraryTarget: 'commonjs2'
        },
        externals: nodeExternals({
          whitelist: /\.css|\.scss$/
        }),
        plugins: [
          new VueSSRServerPlugin()
        ]
      }
    }
    return {
      plugins: [
        new optimize.CommonsChunkPlugin({
          name: "manifest",
          minChunks: Infinity
        }),
        new VueSSRClientPlugin()
      ]
    }
  })(),
}
