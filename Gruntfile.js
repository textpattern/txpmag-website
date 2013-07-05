module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // project configuration

    grunt.initConfig({
        watch: {
            sass: {
                files: 'sass/{,**/}*.scss',
                tasks: ['compass'],
                options: {
                    livereload: false
                }
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
            dist: {
                files: {
                    'js/polyfills/jquery.details.js': ['bower_components/jquery-details/jquery.details.js'],
                    'js/polyfills/jquery.placeholder.js': ['bower_components/jquery-placeholder/jquery.placeholder.js'],
                    'js/polyfills/selectivizr.js': ['bower_components/selectivizr/selectivizr.js'],
                    'js/vendor/google-code-prettify/prettify.js': ['bower_components/google-code-prettify/src/prettify.js'],
                    'js/vendor/jquery/jquery.js': ['bower_components/jquery/jquery.js'],
                }
            }
        },

        concat: {
            dist: {
                files: {
                    // concatenate jQuery UI
                    'js/vendor/jquery-ui/jquery-ui.js': [
                    // comment out any jQuery UI components that are not required
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
                    'js/plugins.js': [
                        'js/ios-viewport-scaling-bug-fix.js',
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
                        'js/main.min.js': ['js/main.js'],
                        'js/plugins.min.js': ['js/plugins.js'],
                        'js/polyfills/jquery.details.min.js': ['js/polyfills/jquery.details.js'],
                        'js/polyfills/jquery.placeholder.min.js': ['js/polyfills/jquery.placeholder.js'],
                        // Selectivizr current a problem with uglify, so we'll manually minify that one
                        //'js/polyfills/jquery.selectivizr.min.js': ['js/polyfills/selectivizr.js'],
                        'js/vendor/google-code-prettify/prettify.min.js': ['js/vendor/google-code-prettify/prettify.js'],
                        'js/vendor/jquery/jquery.min.js': ['js/vendor/jquery/jquery.js'],
                        'js/vendor/jquery-ui/jquery-ui.min.js': ['js/vendor/jquery-ui/jquery-ui.js'],
                        'js/vendor/modernizr/modernizr.min.js': ['js/vendor/modernizr/modernizr.js'],
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: 'js/vendor/google-code-prettify/'
                    },
                ]
            }
        },
    });

    // register default tasks
    grunt.registerTask('default', ['watch']);

    // register building tasks
    grunt.registerTask('build', ['copy', 'concat', 'uglify']);
};