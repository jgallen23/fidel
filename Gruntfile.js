module.exports = function(grunt) {
  require('ft-build')('browser', grunt, {
    name: 'fidel',
    bowerExclude: [
      'jquery'
    ]
  });
};
