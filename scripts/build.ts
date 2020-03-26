import webpack, { Stats } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { IS_ANALYZE } from '../constants/env'
import config from '../config/webpack.config'

if (IS_ANALYZE) {
    config.plugins!.push(new BundleAnalyzerPlugin())
}

const compiler = webpack(config)

compiler.run((err, stats) => {
    if (err) {
        console.error(err)
        return
    }

    const option: Stats.ToStringOptions = {
        modules: IS_ANALYZE,
        colors: true,
    }

    console.log(stats.toString(option))
})
