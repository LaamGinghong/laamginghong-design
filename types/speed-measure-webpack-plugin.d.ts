declare module 'speed-measure-webpack-plugin' {
    import { Configuration, Plugin } from 'webpack'

    interface SpeedMeasureWebpackPluginOptions {
        disable: boolean
        outputFormat: 'json' | 'human' | 'humanVerbose' | ((outputObj: object) => void)
        outputTarget: string | ((outputObj: string) => void)
        pluginNames: object
        granularLoaderData: boolean
    }

    class SpeedMeasureWebpackPlugin extends Plugin {
        constructor(options?: Partial<SpeedMeasureWebpackPluginOptions>)

        wrap(webpackConfig: Configuration): Configuration
    }

    export = SpeedMeasureWebpackPlugin
}
