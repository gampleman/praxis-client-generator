module.exports = (dependencies, globalConfig, execLater, injector, stringify) ->
  $runBefore: ['writeNPM', 'beautify']
  buildConfiguration:
    concat:
      options:
        sourceMap: true
      dist:
        files: [{
          src: 'lib/**',
          dest: 'dist/client.js'
        }]
    uglify:
      dist:
        options:
          compress: true,
          mangle: true,
          sourceMap: true
        files: [{
          src: 'dist/client.js',
          dest: 'dist/client.min.js'
        }]
  targets:
    build: ['concat:dist', 'uglify:dist']
  $process: (docs) ->
    return unless globalConfig.project
    tasks = ("grunt.registerTask('#{k}', #{JSON.stringify(v)});" for k,v of @targets)
    docs.push {
      type: 'js'
      outputPath: 'Gruntfile.js'
      rendered: """
      module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt);
        grunt.initConfig(#{stringify(@buildConfiguration)});
        #{tasks.join('\n')}
      }

      """
    }
    dependencies.addDependency 'node-js-dev', 'load-grunt-tasks', version: '~3'
    dependencies.addDependency 'node-js-dev', 'grunt', version: '~0.4'
    dependencies.addDependency 'node-js-dev', 'grunt-contrib-concat', version: '~0.5'
    dependencies.addDependency 'node-js-dev', 'grunt-contrib-uglify', version: '~0.9'

    execLater 'grunt build'

    docs
