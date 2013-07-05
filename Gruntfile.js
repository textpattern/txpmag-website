module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

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
                    {src: ['src/js/modernizr.js'], dest: 'build/js/modernizr.min.js'},
                    {src: ['src/js/flowplayer'], dest: 'build/js/flowplayer'},
                    {src: ['bower_components/selectivizr/selectivizr.js'], dest: 'build/js/selectivizr.min.js'},
                    {src: ['bower_components/jquery/jquery.min.js'], dest: 'build/js/jquery.min.js'}
                ]
            }
        },

        concat: {
            dist: {
                files: {
                    'tmp/jquery-ui.js': [
                        'bower_components/jquery-ui/ui/jquery.ui.core.js',
                        'bower_components/jquery-ui/ui/jquery.ui.widget.js',
                        'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
                        'bower_components/jquery-ui/ui/jquery.ui.draggable.js',
                        'bower_components/jquery-ui/ui/jquery.ui.droppable.js',
                        'bower_components/jquery-ui/ui/jquery.ui.resizable.js',
                        'bower_components/jquery-ui/ui/jquery.ui.selectable.js',
                        'bower_components/jquery-ui/ui/jquery.ui.sortable.js',
                        'bower_components/jquery-ui/ui/jquery.ui.accordion.js',
                        'bower_components/jquery-ui/ui/jquery.ui.autocomplete.js',
                        'bower_components/jquery-ui/ui/jquery.ui.button.js',
                        'bower_components/jquery-ui/ui/jquery.ui.datepicker.js',
                        'bower_components/jquery-ui/ui/jquery.ui.dialog.js',
                        'bower_components/jquery-ui/ui/jquery.ui.menu.js',
                        'bower_components/jquery-ui/ui/jquery.ui.position.js',
                        'bower_components/jquery-ui/ui/jquery.ui.progressbar.js',
                        'bower_components/jquery-ui/ui/jquery.ui.slider.js',
                        'bower_components/jquery-ui/ui/jquery.ui.spinner.js',
                        'bower_components/jquery-ui/ui/jquery.ui.tabs.js',
                        'bower_components/jquery-ui/ui/jquery.ui.tooltip.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-blind.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-bounce.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-clip.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-drop.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-explode.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-fade.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-fold.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-highlight.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-pulsate.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-scale.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-shake.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-slide.js',
                        'bower_components/jquery-ui/ui/jquery.ui.effect-transfer.js',
                    ],

                    // concatenate global scripts
                    'tmp/plugins.js': [
                        'src/js/ios-viewport-scaling-bug-fix.js',
                        'bower_components/jquery.cookie/jquery.cookie.js',
                        'bower_components/responsive-nav/responsive-nav.js',
                    ],
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: false,
                    preserveComments: 'some',
                },

                files: [
                    {
                        'build/js/main.min.js': ['src/js/main.js'],
                        'build/js/plugins.min.js': ['tmp/plugins.js'],
                        'build/js/jquery.details.min.js': ['bower_components/jquery-details/jquery.details.js'],
                        'build/js/jquery.placeholder.min.js': ['bower_components/jquery-placeholder/jquery.placeholder.js'],
                        'build/js/prettify.min.js': ['bower_components/google-code-prettify/src/prettify.js'],
                        'build/js/jquery-ui.min.js': ['tmp/jquery-ui.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'build/js/'
                    },
                ]
            }
        },
    });

    // register default tasks
    grunt.registerTask('default', ['watch']);

    // register building tasks
    grunt.registerTask('build', ['compass', 'copy', 'concat', 'uglify']);
};