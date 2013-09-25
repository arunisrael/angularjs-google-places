'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/angularjs-google-places.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globalstrict: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          expect: true,
          it: true,
          spyOn: true,
          beforeEach: true,
          angular: true,
          inject: true,
          describe: true,
          afterEach: true,
          google:true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/angularjs-google-places.js'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-karma');
grunt.registerTask('default', ['jshint', 'karma','uglify']);
};
