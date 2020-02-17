const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { loader } = MiniCssExtractPlugin

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  context: path.resolve(__dirname),
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: path.resolve(__dirname, 'lib'),
    library: '',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
