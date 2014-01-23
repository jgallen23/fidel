module.exports = function(grunt) {
  require('fatjs')(grunt, {
    name: 'fidel',
    bowerExclude: [
      'jquery'
    ]
  });
};