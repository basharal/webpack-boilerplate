// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

const webpack = require('webpack');
const process = require('process');

module.exports = {
  entry: {
    index: './src/index.ts',
    main: './src/main.ts'
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.NamedChunksPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      hash: false,
      chunks: ['index', 'styles', 'vendors']
    }),
    new WebpackMd5Hash(),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      configFile: './stylelint.config.css.js',
      files: ['./src/**/*.css']
    }),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: ['./src/**/*.s?(a|c)ss']
    })
    // new BundleAnalyzerPlugin()
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'js/[name].[hash:8].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.tsx', '.ts', '.js', 'jsx', 'vue', 'json']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.(s*)css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: ['\\.vue$']
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /api\/.*js/],
        use: ['jshint-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        // Used to resolve img src in html to optimized versions.
        loader: 'html-loader',
        options: {
          attrs: ['img:src']
        }
      }
    ]
  }
};
