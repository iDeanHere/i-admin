'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  chainWebpack: config => {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/]
      }
    ])
    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          elementPlus: {
            name: 'chunk-elementPlus', // 将 element-plus 依赖分割到单独的 chunk 文件
            priority: 20, // 优先级必须高于 libs 或者 app 的打包，否则将 libs 或 app 的 chunk 文件中
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/
          },
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 只打包初始依赖的第三方包
          },
          commons: {
            name: 'chunk-commons',
            priority: 5,
            test: resolve('src/components'),
            minChunks: 3, // 设置必须被三个以上的模块共享才会被拆分
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
        path.resolve(__dirname, './src/styles/mixin.scss')
      ]
    }
  },
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: true,
    // proxy: {
    //   [process.env.VUE_APP_BASE_API_URI]: {
    //     target: 'http://localhost:8088',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API_URI]: ''
    //     }
    //   }
    // },
    before: require('./mock/server/index.ts')
  }
}
