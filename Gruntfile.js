module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');

    // project configuration

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: 'src/sass/**',
                tasks: ['compass']
            },

            js: {
                files: 'src/assets/js/*.js',
                tasks: ['jshint', 'copy', 'uglify']
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
                    {expand: true, cwd: 'src/assets/js/libs/', src: ['**'], dest: 'public/assets/js/'},
                    {src: ['bower_components/selectivizr/selectivizr.js'], dest: 'public/assets/js/selectivizr.js'}
                ]
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/js/*.js'],
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
                    module: true,
                    require: true,
                    requirejs: true,
                    responsiveNav: true,
                    prettyPrint: true
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
                        'public/assets/js/main.js': ['src/assets/js/main.js'],
                        'public/assets/js/details.js': ['bower_components/jquery-details/jquery.details.js'],
                        'public/assets/js/placeholder.js': ['bower_components/jquery-placeholder/jquery.placeholder.js'],
                        'public/assets/js/prettify.js': ['bower_components/google-code-prettify/src/prettify.js'],
                        'public/assets/js/require.js': ['bower_components/requirejs/require.js'],
                        'public/assets/js/cookie.js': ['bower_components/jquery.cookie/jquery.cookie.js'],
                        'public/assets/js/responsivenav.js': ['bower_components/responsive-nav/responsive-nav.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'public/assets/js/'
                    }
                ]
            }
        },

        shell: {
            setup: {
                command: [
                    'mkdir -pv tmp',
                    'cd tmp',
                    'rm -Rf dev',
                    'echo "Downloading Textpattern via SVN..."',
                    'svn export http://textpattern.googlecode.com/svn/development/4.x dev',

                    'echo "Cleaning up downloaded package..."',
                    'cd dev',
                    'rm -f .gitignore',
                    'rm -Rf sites',
                    'rm -Rf images',
                    'rm -Rf files',
                    'rm -Rf js',
                    'rm -f HISTORY.txt',
                    'rm -f LICENSE-LESSER.txt',
                    'rm -f LICENSE.txt',
                    'rm -f README.txt',

                    'echo "Removing current installation..."',
                    'cd ../../public',
                    'mkdir -pv files',
                    'mkdir -pv images',
                    'rm -Rf rpc',
                    'rm -Rf textpattern',
                    'rm -f .htaccess',
                    'rm -f css.php',
                    'rm -f index.php',

                    'echo "Moving in the new installation..."',
                    'cd ..',
                    'cp -rf tmp/dev/ public/',

                    'echo "Removing trash..."',
                    'rm -Rf tmp'
                ].join('&&'),
                options: {
                    stdout: true
                }
            }
        }
    });

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'compass', 'copy', 'uglify']);
    grunt.registerTask('travis', ['jshint']);
    grunt.registerTask('setup', ['shell:setup']);
};