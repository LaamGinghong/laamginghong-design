const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { loader } = MiniCssExtractPlugin

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  context: path.resolve(__dirname),
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './lib'),
    library: 'MyDesign',
    libraryExport: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      {
        test: /\.css/,
        use: [
          {
            loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
