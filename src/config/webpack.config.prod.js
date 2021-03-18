'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

const config = require('./webpack.config.base.js');

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].css';

const chunksSortMode = require('./chunksSortMode');

const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};

config.bail = true;

config.devtool = 'source-map';

config.output.publicPath = publicPath;

config.module.rules
  .filter(rule => rule['test'] && rule.test.test('.css'))
  .forEach(rule => {
    let { use } = rule;
    rule.use = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use
    });
  });

config.plugins = [
  ...config.plugins,
  new InterpolateHtmlPlugin(env.raw),
  ...(paths.htmlOut.map(obj => new HtmlWebpackPlugin(
    Object.assign({
      inject: true,
      chunksSortMode,
      minify,
    }, obj)
  ))),
  new webpack.DefinePlugin(env.stringified),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      reduce_vars: false
    },
    output: {
      comments: false
    },
    sourceMap: true
  }),
  new ExtractTextPlugin({ filename: cssFilename }),
  new ManifestPlugin({ fileName: 'asset-manifest.json' }),
  new SWPrecacheWebpackPlugin({
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: 'service-worker.js',
    logger (message) {
      if (message.indexOf('Total precache size is') === 0) {
        return;
      }
      console.log(message);
    },
    minify: true,
    navigateFallback: publicUrl + '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__).*/],
    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    stripPrefix: paths.appBuild.replace(/\\/g, '/') + '/'
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];
config.performance = {
  hints: false
};

module.exports = config;
