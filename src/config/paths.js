'use strict';

function ensureSlash (path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

function getServedPath (appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './');
  return ensureSlash(servedUrl, true);
}

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = appPackageJson => (envPublicUrl || require(appPackageJson).homepage);

const paths = [
    '.env',
    'build',
    'public',
    'package.json',
    'src',
    'yarn.lock',
    'src/setupTests.js',
    'node_modules',
    'src/index.js',
    'public/index.html',
  ]
  .map(p => ({[p]: resolveApp(p)}))
  .reduce((t, c) => Object.assign({}, t, c), {});

const resolvedPaths = {
  dotenv: paths['.env'],
  appBuild: paths['build'],
  appPublic: paths['public'],
  appPackageJson: paths['package.json'],
  appSrc: paths['src'],
  testsSetup: paths['src/setupTests.js'],
  appNodeModules: paths['node_modules'],
  publicUrl: getPublicUrl(paths['package.json']),
  servedPath: getServedPath(paths['package.json']),

  appHtml: [paths['public/index.html']],
  appIndexJs: [paths['src/index.js']],

  entry: {
    vendor: [
      require.resolve('./polyfills'),
      'react',
      'redux',
      'react-redux',
      'react-bootstrap',
      'react-router'
    ],
    'main': [paths['src/index.js']],
  },
  htmlOut: [
    {
      template: paths['public/index.html'],
      filename: 'index.html',
      chunks: ['vendor', 'main'],
    },
  ]
};

module.exports = resolvedPaths;
