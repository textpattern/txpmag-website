module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // project configuration

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: 'src/sass/**',
                tasks: ['compass']
            },

            js: {
                files: 'src/*.js',
                tasks: ['copy', 'uglify']
            }
        },

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'public/', filter: 'isFile'},
                    {expand: true, cwd: 'src/js/', src: ['flowplayer/**'], dest: 'public/js/'},
                    {src: ['src/js/modernizr.js'], dest: 'public/js/modernizr.js'},
                    {src: ['bower_components/selectivizr/selectivizr.js'], dest: 'public/js/selectivizr.js'}
                ]
            }
        },

        jshint: {
            files: ['Gruntfile.js'],
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                es3: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                browser: true,
                globals: {
                    jQuery: true,
                    Zepto: true,
                    define: true,
                    module: true
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: false,
                    preserveComments: 'some'
                },

                files: [
                    {
                        'public/js/main.js': ['src/js/main.js'],
                        'public/js/details.js': ['bower_components/jquery-details/jquery.details.js'],
                        'public/js/placeholder.js': ['bower_components/jquery-placeholder/jquery.placeholder.js'],
                        'public/js/prettify.js': ['bower_components/google-code-prettify/src/prettify.js'],
                        'public/js/require.js': ['bower_components/requirejs/require.js'],
                        'public/js/cookie.js': ['bower_components/jquery.cookie/jquery.cookie.js'],
                        'public/js/responsivenav.js': ['bower_components/responsive-nav/responsive-nav.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'public/js/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['compass', 'copy', 'uglify']);
};