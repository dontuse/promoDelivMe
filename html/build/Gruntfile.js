/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            dist: {
                src:  grunt.file.readJSON('js.json'),
                dest: '../publish/script.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    '../publish/script.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        less: {
            dev: {
                options: {
                },
                files: {
                    "../publish/style.css": "../blocks/love.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "../publish/style.css": "../blocks/love.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= concat.dist.src %>','js.js'],
                tasks: 'concat'
            },
            css: {
                files: [
                    '../blocks/**/*.less',
                    '../blocks/*.less'
                ],
                tasks: 'less:dev'

            }
        },
        imageEmbed: {
            dist: {
                src: ['../publish/style.css'],
                dest: '../publish/style.css',
                options: {
                    deleteAfterEncoding : false
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');    // конкатит файлы
    grunt.loadNpmTasks('grunt-contrib-less');     // компилит less / жмет
    grunt.loadNpmTasks('grunt-contrib-uglify');  // жмет js
    grunt.loadNpmTasks('grunt-contrib-watch');  // вотчер
    grunt.loadNpmTasks("grunt-image-embed");   // конвертит картинке в base64


    // main dev task
    grunt.registerTask('default', [ 'concat' , 'less:dev']);

    // production
    grunt.registerTask('prod', ['concat', 'uglify' , 'less:production' , 'imageEmbed'] );




};