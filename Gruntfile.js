module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var fs = require('fs'),
        moment = require('moment'),
        version = grunt.option('ver'),
        jsonFiles = ['package.json', 'bower.json'],
        releaseBranch = 'release-' + version,
        releaseTag = 'v' + version;

    grunt.initConfig({
        karma: {
            test: {
                options: {
                    files: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/i-bem/i-bem.js',
                        'bower_components/bemer/bemer.js',
                        'lib/bemodeler.js',
                        'test/simple.js',
                        'test/value.js',
                        'test/params.js',
                        'test/get.js',
                        'test/set.js',
                        'test/modifiers.js',
                        'test/DOM.js'
                    ]
                },
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR',
                frameworks: ['mocha', 'chai'],
                reporters: ['mocha']
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        file_append: {
            release: {
                files: {
                    'bemodeler.js': {
                        prepend: '/*!\n' +
                            ' * @file <%= pkg.description %>\n' +
                            ' * @copyright ' + moment().format('YYYY') +
                            ' <%= pkg.author.name %>, <%= pkg.author.homepage %>\n' +
                            ' * @license MIT license\n' +
                            ' * @version ' + version + '\n' +
                            ' * @date ' + moment().format('DD MMMM YYYY') + '\n' +
                            ' */\n',
                        input: 'lib/bemodeler.js'
                    }
                }
            }
        },
        uglify: {
            release: {
                options: { preserveComments: 'some' },
                files: { 'bemodeler.min.js': 'bemodeler.js' }
            }
        },
        prompt: {
            release: {
                options: {
                    questions: [
                        {
                            config: 'isReleaseOk',
                            type: 'confirm',
                            default: false,
                            message: 'Please check is everything alright'
                        }
                    ]
                }
            }
        },
        shell: {
            prerelease: {
                command: [
                    'git checkout dev',
                    'git add ' + jsonFiles.join(' '),
                    'git commit -m "' + releaseTag + '" -n',
                    'git checkout -b ' + releaseBranch,
                    'git add -f bemodeler.js bemodeler.min.js',
                    'git commit -m "' + releaseTag + '" -n',
                    'git tag ' + releaseTag,
                    'git checkout master && git branch -D ' + releaseBranch,
                    'git merge --no-ff dev -m "' + releaseTag + '"'
                ].join(' && ')
            },
            release:  {
                command: function() {
                    return grunt.config('isReleaseOk')
                        ? 'git push origin master dev ' + releaseTag
                        : '';
                }
            },
            jscs: { command: './node_modules/.bin/jscs lib/' },
            jshint: { command: './node_modules/.bin/jshint lib/' }
        }
    });

    grunt.registerTask('lint', [
        'shell:jscs',
        'shell:jshint'
    ]);

    grunt.registerTask('release', function() {
        if(!version) throw new Error('Parameter --ver must be set!');

        jsonFiles.forEach(function(file) {
            var json = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
            json.version = version;
            fs.writeFileSync(file, JSON.stringify(json, undefined, '    ') + '\n');
        }, this);

        grunt.task.run('karma', 'lint');

        grunt.task.run(
            'file_append:release',
            'uglify:release'
        );

        grunt.task.run(
            'shell:prerelease',
            'prompt:release',
            'shell:release'
        );
    });

};
