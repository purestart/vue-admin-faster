const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true, // 包含编译器
  // baseUrl: process.env.BASE_URL || '/',
  // lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ['element-ui-verify/dist'],
  chainWebpack: config => {
    // config.optimization.minimize(false)

    // 去掉eslint的loader，不建议！！
    // const eslint = config.module.rule("eslint");
    // eslint.uses.clear();

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-spritse-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 单独打包vue相关库
    // config.entry('lib')
    //   .add('vue')
    //   .add('vuex')
    //   .add('vue-router')
    //   .end()
    // config.optimization.splitChunks({
    //   cacheGroups: {
    //     lib: {
    //       name: `lib`,
    //       priority: 1,
    //       chunks: 'initial',
    //       test: 'lib',
    //     },
    //     vendors: {
    //       name: `chunk-vendors`,
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: `chunk-common`,
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   }
    // })
    // 设置一些别名
    // config.resolve.alias
    //   .set('@g', resolve('src/global'))
    //   .set('@bc', resolve('src/baseComponent'))
    //   .set('@common', resolve('src/modules/common/view'))
    //   .set('@utils', resolve('src/assets/utils'))
  },
  devServer: {
    port: 9088,
    proxy: {
      '/zhy/': {
        target: 'http://127.0.0.1:8081', // 'http://172.17.6.190:8081' 测试 172.16.2.174
        ws: false,
        changeOrigin: true
      },
      '/zhyAdmin/': {
        target: 'http://127.0.0.1:8082', // 'http://172.17.6.190:8082'
        ws: false,
        changeOrigin: true
      }
    }
  }
}
