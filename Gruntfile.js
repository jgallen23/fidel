module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    config: {
      info: grunt.file.readJSON('bower.json'),
      meta: {
        banner: '/*!\n'+
            ' * <%= info.name %> - <%= info.description %>\n'+
            ' * v<%= info.version %>\n'+
            ' * <%= info.homepage %>\n'+
            ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
            ' * <%= info.license %> License\n'+
            '*/\n'
      }
    }
  });
};