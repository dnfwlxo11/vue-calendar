const path = require('path');
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: path.resolve(__dirname, './docs'),
  publicPath: '/vue-calendar/'
})
