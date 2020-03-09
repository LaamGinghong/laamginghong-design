module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [require.resolve('ts-loader')],
    })

    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    })

    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
