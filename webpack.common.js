// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlPwaPlugin = require('pwa');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: { main: './src/index.ts' },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.NamedChunksPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash:8].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash:8].css'
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css|html|svg)$'),
//      threshold: 10240,
      minRatio: 0.8 
    }),
    new HtmlPwaPlugin(
      {
        name: 'web'
      }
    ),
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    // Copy the images folder and optimize all the images
    new CopyWebpackPlugin([
      {
        from: 'src/img',
        to: 'img/[path][name].[hash:8].[ext]',
        cache: true
      }
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: false,
      hash: false,
      minify: {
        removeComments: !devMode,
        collapseWhitespace: !devMode,
        removeAttributeQuotes: !devMode,
        collapseBooleanAttributes: !devMode,
        removeScriptTypeAttributes: !devMode
      }, 
    }),
    new WebpackMd5Hash(),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: [
        './src/**/*.s?(a|c)ss',
        './src/**/*.css'
      ]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
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
        commons: {
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
        test: /\.css$/,
        use: [
          // Adds CSS to the DOM by injecting a `<style>` tag
          'style-loader',
          MiniCssExtractPlugin.loader,
          // Interprets `@import` and `url()` like `import/require()` and will resolve them
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          // Adds CSS to the DOM by injecting a `<style>` tag
          MiniCssExtractPlugin.loader,
          // Interprets `@import` and `url()` like `import/require()` and will resolve them
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
            {
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            }
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
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
        exclude: /node_modules/,
        use: [
          "jshint-loader",
          "eslint-loader",
        ],
      }
    ]
  }
};
