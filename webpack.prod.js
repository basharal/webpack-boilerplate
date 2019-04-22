const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlPwaPlugin = require('pwa');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    }
  },
  plugins: [
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css|html|svg)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new HtmlPwaPlugin({
      name: 'web'
    }),
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|webp|svg)$/i })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        warningsFilter: function() {
          return true;
        },
        extractComments: false,
        sourceMap: true,
        cache: true,
        parallel: true,
        include: undefined,
        exclude: undefined,
        uglifyOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/
          },
          mangle: {
            safari10: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
