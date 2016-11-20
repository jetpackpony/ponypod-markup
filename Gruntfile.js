/*
 * Generated on 2014-02-21
 * generator-assemble v0.4.9
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'public'
    },
    sass: {
      dist: {
        options: {
          loadPath: [
            "bower_components/bootstrap/scss/",
            "bower_components/tether/src/css/"
          ]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/styles',
          src: ['*.scss'],
          dest: '<%= config.dist %>/assets/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: ['<%= config.src %>/styles/{,*/}*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,json,yml}'],
        tasks: ['assemble']
      },
      copy: {
        files: ['<%= config.src %>/img/*'],
        tasks: ['copy']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    bower_concat: {
      all: {
        dest: '<%= config.dist %>/assets/js/bower.js'
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/img/',
          src: '**',
          dest: '<%= config.dist %>/assets/img/',
          filter: 'isFile'
        }]
      },
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'bower_concat',
    'copy',
    'assemble',
    'sass'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
