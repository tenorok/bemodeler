module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

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
                        'test/modifiers.js'
                    ]
                },
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR',
                frameworks: ['mocha', 'chai'],
                reporters: ['mocha']
            }
        }
    });

};
