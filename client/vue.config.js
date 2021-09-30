const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const isSSR = Boolean(process.env.SSR);
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  outputDir: '../server/public',
  pages: {
    index: {
      entry: `src/main${isSSR ? '-ssr' : '' }.js`,
      template: 'public/index.html',
      filename: isProduction ? '../template/index.html' : 'index.html',
    }
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000"
      }
    }
  },
  chainWebpack: config => {
    if (!isProduction) return;

    if (!isSSR) {

      return config
              .optimization
                .splitChunks({ name: "manifest", minChunks: Infinity, })
                .end()
              .plugin('ssr').use(new VueSSRClientPlugin())
    }

    config
      .target('node')
      .optimization
        .delete('splitChunks')
        .end()
      .output
        .libraryTarget('commonjs2')
        .end()
      .externals(nodeExternals({ allowlist: /\.css|\.scss$/ }))
      .plugin('ssr').use(new VueSSRServerPlugin());
  },
}
