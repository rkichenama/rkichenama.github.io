'use strict';

let async = require('async');
let sass = require('node-sass');
let path = require('path');
let fs = require('fs');
let glob = require('glob');
let babel = require('babel-core');
let concat = require('concat-files');

function aWrap (fn) {
  return (cb) => {
    fn();
    cb();
  }
}

async.parallel([
  aWrap(() => (
    glob('./scss/**/!(_*)*.scss', (err, files) => {
      if (!err) {
        files.forEach((file) => {
          let outFile = file.replace(/scss/g, 'css');
          sass.render({
            file: file,
            outFile: outFile,
            outputStyle: 'expanded',
            sourceMap: true
          }, (error, result) => {
            if(!error) {
              fs.writeFile(outFile, result.css, (err) => {});
              fs.writeFile(outFile + '.map', result.map, (err) => {});
            }
          });
        });
      }
    })
  )),
  aWrap(() => (
    glob('./jsx/**/!(_*)*.jsx', (err, files) => {
      if (!err) {
        let outFile = './js/script.js';
        concat(files, outFile, () => {
          babel.transformFile(outFile, {
            presets: ['babel-preset-es2015', 'babel-preset-react'],
            sourceMaps: 'inline',
            compact: true,
          }, (error, result) => {
            if(!error) {
              fs.writeFile(outFile, result.code, (err) => {});
            }
          });
        })
      }
    })
  )),
  aWrap(() => {
    [
      './node_modules/react/dist/react-with-addons.min.js',
      './node_modules/react-dom/dist/react-dom.min.js',
      './node_modules/alfred/dist/alfred.min.js',
    ].forEach((lib) => {
      fs.createReadStream(lib)
        .pipe(fs.createWriteStream('./js' + lib.substr(lib.lastIndexOf('/'))));
    });

  }),
], () => console.log('process complete'));
