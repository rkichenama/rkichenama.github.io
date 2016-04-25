'use strict';

let watch = require('node-watch');

watch('./scss/', () => {
  console.log((new Date()).toTimeString(), 'recompiling styles');
  require('child_process').fork('./index.js');
});

watch('./jsx/', () => {
  console.log((new Date()).toTimeString(), 'recompiling scripts');
  require('child_process').fork('./index.js');
});
