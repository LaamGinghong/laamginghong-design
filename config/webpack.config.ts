import { Configuration, RuleSetUseItem, BannerPlugin } from 'webpack'
import { resolve } from 'path'
import WebpackBar from 'webpackbar'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import SpeedMeasureWebpackPlugin from 'speed-measure-webpack-plugin'
import SizePlugin from 'size-plugin'

import { PROJECT_ROOT, PROJECT_NAME } from '../constants/env'
import getCssLoaders from '../constants/get-css-loaders'

const config: Configuration = {
    mode: 'production',
    context: PROJECT_ROOT,
    entry: resolve(PROJECT_ROOT, 'src', 'index.ts'),
    output: {
        filename: 'index.js',
        path: resolve(PROJECT_ROOT, 'lib'),
        publicPath: resolve(PROJECT_ROOT, 'lib'),
        library: '',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    experimentalFileCaching: true,
                    configFile: resolve(PROJECT_ROOT, 'tsconfig.json'),
                },
                exclude: /node_modules/,
            },
            { test: /\.css$/, use: getCssLoaders(0) },
            {
                test: /\.less$/,
                use: [...(getCssLoaders(1) as RuleSetUseItem[]), { loader: 'less-loader', options: { sourceMap: true } }],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 500,
                    name: '[name].[hash:6].[ext]',
                    outputPath: 'images',
                },
            },
        ],
    },
    plugins: [
        new WebpackBar({ name: PROJECT_NAME, color: '#61dafb' }),
        new BannerPlugin({
            raw: true,
            banner: `/** @preserve Powered by ${PROJECT_NAME} (https://github.com/LaamGinghong/laamginghong-design) */`,
        }),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBuildNotifierPlugin({ suppressSuccess: true }),
        new CaseSensitivePathsWebpackPlugin(),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: PROJECT_ROOT,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new SizePlugin({ writeFile: false }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCssAssetsPlugin()],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
}

const smp = new SpeedMeasureWebpackPlugin()
export default smp.wrap(config)
