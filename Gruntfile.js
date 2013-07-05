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
            build: {
                files: 'src/**',
                tasks: ['build']
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
                    {expand: true, cwd: 'src/', src: ['img/**', 'fonts/**'], dest: 'build/'},
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'build/', filter: 'isFile'},
                    {expand: true, cwd: 'src/js/', src: ['flowplayer/**'], dest: 'build/js/'},
                    {src: ['src/js/jquery-ui-testing.js'], dest: 'build/js/jquery-ui-testing.js'},
                    {src: ['src/js/modernizr.js'], dest: 'build/js/modernizr.js'},
                    {src: ['bower_components/selectivizr/selectivizr.js'], dest: 'build/js/selectivizr.js'}
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
                        'build/js/main.js': ['src/js/main.js'],
                        'build/js/details.js': ['bower_components/jquery-details/jquery.details.js'],
                        'build/js/placeholder.js': ['bower_components/jquery-placeholder/jquery.placeholder.js'],
                        'build/js/prettify.js': ['bower_components/google-code-prettify/src/prettify.js'],
                        'build/js/require.js': ['bower_components/requirejs/require.js'],
                        'build/js/cookie.js': ['bower_components/jquery.cookie/jquery.cookie.js'],
                        'build/js/responsivenav.js': ['bower_components/responsive-nav/responsive-nav.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'build/js/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['compass', 'copy', 'uglify']);
};