/** ************************************************
*
* Gruntfile.js
*
* Commands:
* - grunt (development)
* - grund release (production)
*
************************************************ **/

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-string-replace')
  grunt.loadNpmTasks('grunt-ts')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //
    // Copy
    //
    copy: {
      css: { expand: true, cwd: 'src/css/', src: ['game.css'], dest: 'build/css' },
      phaser: { expand: true, cwd: 'src/lib/phaser', src: '*.js', dest: 'build/js/lib/phaser' },
      assets: { expand: true, cwd: 'src/assets', src: '**/*', dest: 'build/assets' }
    },
    //
    // Clean
    //
    clean: {
      build: ['build'],
      css: ['src/css']
    },
    //
    // SASS
    //
    compass: {
      dev: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'src/css',
          environment: 'development',
          sourcemap: true
        }
      },
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'src/css',
          environment: 'production',
          sourcemap: false
        }
      }
    },
    //
    // Concat
    //
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dependencies: {
        src: ['src/lib/phaser/phaser.min.js'],
        dest: 'build/js/dependencies.js'
      },
      css: {
        src: ['src/css/**/*.css'],
        dest: 'build/css/game.css'
      }
    },
    //
    // Web Server
    //
    connect: {
      server: {
        options: {
          port: 8080,
          base: './build',
          livereload: true,
          open: true
        }
      }
    },
    //
    // CSS minification
    //
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['game.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },
    //
    // HTML minification
    //
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },
    //
    // Jade Templating
    //
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'build/index.html': ['src/markup/index.jade']
        }
      }
    },
    //
    // Prodcution Switch
    //
    'string-replace': {
      prod: {
        src: 'build/index.html',
        dest: 'build/index.html',
        options: {
          replacements: [{
            pattern: 'js/game.js',
            replacement: 'js/game.min.js'
          },
          {
            pattern: 'js/lib/phaser/phaser.js',
            replacement: 'js/dependencies.min.js'
          },
          {
            pattern: 'ss/game.css',
            replacement: 'ss/game.min.css'
          }]
        }
      }
    },
    //
    // TypeScript
    //
    ts: {
      options: {
        target: 'es5',
        sourceMap: true
      },
      default: {
        src: ['src/**/*.ts', '!node_modules/**'],
        out: 'build/js/game.js'
      }
    },
    //
    // UglifyJS
    //
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      game: {
        files: {
          'build/js/game.min.js': ['build/js/game.js']
        }
      },
      dependencies: {
        files: {
          'build/js/dependencies.min.js': ['build/js/dependencies.js']
        }
      }
    },
    //
    // Watcher
    //
    watch: {
      options: {
        livereload: true
      },
      typescript: {
        files: 'src/game/**/*.ts',
        tasks: ['ts']
      },
      sass: {
        files: 'src/sass/**/*.scss',
        tasks: ['compass:dev', 'copy:css']
      },
      jade: {
        files: 'src/markup/*.jade',
        tasks: ['jade']
      },
      assets: {
        files: 'src/assets/**/*',
        tasks: ['copy:assets']
      }
    }
  })

  //
  // Tasks
  //
  grunt.registerTask('default', ['clean', 'ts', 'compass:dev', 'copy', 'jade', 'connect', 'watch'])
  grunt.registerTask('release', ['clean', 'ts', 'compass:dist', 'cssmin', 'concat', 'uglify:game', 'jade', 'htmlmin:dist', 'string-replace', 'copy:assets', 'uglify:dependencies', 'connect', 'watch'])
}
