module.exports = function(grunt) {
  var _ = require('lodash');

  require('load-grunt-tasks')(grunt);


  var less_autoprefix_plugin = require('less-plugin-autoprefix'),
    less_autoprefix = new less_autoprefix_plugin({browsers: ["> 1%", "last 2 versions"]}),
    less_groupMQ = require('less-plugin-group-css-media-queries'),
    less_cleanCSS_plugin = require('less-plugin-clean-css'),
    less_cleanCSS = new less_cleanCSS_plugin({advanced: true});

  var today = new Date().getTime();
  var started = new Date('4/8/2015').getTime();
  var elapsedDays = Math.floor((today - started)/(24*60*60*1000) + 1);


  var sites = grunt.file.readJSON('src/config/data.json');
  var templateTaskTpl = {
    'helpers': 'src/markup/helpers/*.js',
    'partials': 'src/markup/partials/*.handlebars'
  };

  var pagesToBuild = {
    'index': {
        template: 'src/markup/pages/index.handlebars',
        output: 'dist/index.html',
        partials: 'src/markup/partials/**/*.handlebars'
      }
    };

  pagesToBuild['index'] = _.extend({
      'template': 'src/markup/pages/index.handlebars',
      'templateData' : {},
      'output' : 'dist/index.html',
    },templateTaskTpl);

  _.each(sites,function(d,i){
    var slug = d.title.toLowerCase().replace(/[^\w]/gi,'-');
    var taskObj = _.extend({
      'template': 'src/markup/pages/subpage.handlebars',
      'templateData' : d,
      'output' : 'dist/sites/'+slug+'/index.html',
    },templateTaskTpl);

    pagesToBuild[slug] = taskObj;

  });


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //todo: js files

    less: {
      development: {
        options: {
          plugins: [
            less_autoprefix,
            less_groupMQ,
          ]
        },
        files: {
          "dist/css/style.css": "src/css/style.less"
        }
      },

      production: {
        options: {
          plugins: [
            less_autoprefix,
            less_groupMQ,
            less_cleanCSS
          ]
        },
        files: {
          "dist/css/style.css": "src/css/style.less"
        }
      }

    },

    'compile-handlebars': pagesToBuild,

    'ftp-deploy': {
      development: {
        auth: {
          host: 'kovalent.co',
          port: 21,
          authKey: 'ftpUser'
        },
        src: 'dist/',
        dest: '/public_html/thejobist/100',
        exclusions: ['dist/**/.DS_Store','dist/**/thumbs.db','dist/**/Thumbs.db']
      }
    },

    watch: {
      src: {
        files: ['src/**/*.js', 'src/**/*.less', 'src/**/*.handlebars'],
        tasks: ['default']
      }
    },

    pageres: {
      onehundred: {
        options: {
          url: '100.thejobist.com',
          sizes: ['1300x1100'],
          dest: 'progress',
          filename: 'day'+elapsedDays
        }
      }
    },
    clean: {
      development: ["dist"],
    },

    shell: {
      localServer: {
        command: 'http-server ./dist -p1337 -o -s'
      }
    },

    copy: {
      data: {
        src: 'src/config/data.json',
        dest: 'dist/data.json'
      },
      jquery: {
        src: 'bower_components/jquery/dist/jquery.min.js',
        dest: 'dist/js/lib/jquery.min.js'
      },
      handlebars: {
        src: 'bower_components/handlebars/handlebars.min.js',
        dest: 'dist/js/lib/handlebars.runtime.min.js'
      },
      api: {
        src: 'src/markup/api/add.php',
        dest: 'dist/api/add/index.php'
      }
    },

    uglify: {
      footer: {
        options: {
          beautify: true
        },
        files: {
          'dist/js/footer.js': ['dist/js/lib/*.js','src/js/app.js','src/js/analytics.js']
        }
      },
      libs: {
        options: {
          mangle: false
        },
        files: {
          'dist/js/libs.js': ['dist/js/lib/*.js']
        }
      }
    }

  });

  //building
  grunt.registerTask('copyLibs', ['copy:jquery','copy:handlebars']);
  grunt.registerTask('copyAll',['copyLibs','copy:data','copy:api']);
  grunt.registerTask('development', ['clean:development','less:development','compile-handlebars','copyAll','uglify']);
  //grunt.registerTask('production', ['less:production','compile-handlebars']); //need to rethink this strategy, may want to minify css after build instead of during

  //helpers
  grunt.registerTask('server',['development','shell:localServer']);
  grunt.registerTask('push',['development','ftp-deploy:development','pageres:onehundred']);

  grunt.registerTask('default', ['development']);

}