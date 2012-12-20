module.exports = function(grunt) {
  grunt.initConfig({
    info: '<json:package.json>',
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/'
    },
    lint: {
      all: [
        'lib/fidel.js',
        'lib/jquery.js',
        'grunt.js',
        'component.json',
        'test/*.js'
      ]
    },
    concat: {
      dist: {
        src: [
          '<banner>',
          'lib/head.js',
          'lib/fidel.js',
          'lib/jquery.js',
          'lib/foot.js'
        ],
        dest: 'dist/fidel.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/fidel.js'],
        dest: 'dist/fidel.min.js'
      }
    },
    mocha: {
      all: {
        src: 'test/index.html',
        run: true
      }
    },
    reloadr: {
      all: [
        'dist/fidel.js',
        'test/**/*'
      ]
    },
    watch: {
      js: {
        files: '<config:lint.all>',
        tasks: 'default' 
      }
    },
    server:{
      port: 8000,
      base: '.'
    }
  });
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-reloadr');
  grunt.registerTask('default', 'lint concat min');
  grunt.registerTask('dev', 'server reloadr watch');
};
