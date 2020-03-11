const path = require('path')
const { BannerPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBuildNotifier = require('webpack-build-notifier')
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const { loader } = MiniCssExtractPlugin

const PRODUCT_ROOT = path.resolve(__dirname)

const config = {
  mode: 'production',
  entry: path.resolve(PRODUCT_ROOT, 'src', 'index.ts'),
  context: path.resolve(PRODUCT_ROOT),
  devtool: 'cheap-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(PRODUCT_ROOT, 'lib'),
    publicPath: path.resolve(PRODUCT_ROOT, 'lib'),
    library: '',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      {
        test: /\.css/,
        use: [{ loader, options: { publicPath: '../' } }, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader, options: { publicPath: '../' } },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 500,
          name: 'images/[name].[hash:6].[ext]',
        },
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  plugins: [
    new WebpackBar({ name: 'LaamGinghong-design', color: '#61dafb' }),
    new BannerPlugin({
      raw: true,
      banner: `/** @preserve Powered by LaamGinghong-design (https://github.com/LaamGinghong/laamginghong-design.git) */`,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifier({ suppressSuccess: true }),
    new CaseSensitivePathsWebpackPlugin(),
    new CircularDependencyPlugin(),
    new CleanWebpackPlugin(),
    new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'warn' } }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({ extractComments: false }),
      new OptimizeCssAssetsWebpackPlugin(),
    ],
  },
}

module.exports = new SpeedMeasurePlugin().wrap(config)
