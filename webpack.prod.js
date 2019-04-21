const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    }
  },
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
