'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const chunksSortMode = require('./chunksSortMode');

const publicUrl = '';
const env = getClientEnvironment(publicUrl);

let config = require('./webpack.config.base.js');

config.devtool = '#cheap-inline-source-map';
const devTools = [
  require.resolve('react-dev-utils/webpackHotDevClient'),
  require.resolve('react-error-overlay')
];
for (let item in config.entry) {
  if (item === 'vendor') continue;
  //  push the devTools before the source files
  [].unshift.apply(config.entry[item], devTools);
}

config.module.rules
  .filter(rule => rule['test'] && rule.test.test('.css'))
  .forEach(rule => {
    let { use } = rule;
    rule.use = [require.resolve('style-loader'), ...use];
  });

config.plugins = [
  ...config.plugins,
  new InterpolateHtmlPlugin(env.raw),
  ...(paths.htmlOut.map(obj => new HtmlWebpackPlugin(Object.assign({
    inject: true,
    chunksSortMode,
  }, obj)))),
  new webpack.DefinePlugin(env.stringified),
  new webpack.HotModuleReplacementPlugin(),
  new CaseSensitivePathsPlugin(),
  new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];
config.performance = {
  hints: false
};

module.exports = config;
