module.exports = function(grunt) {

  grunt.initConfig({
    serve: {
        options: {
            port: 9000
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
  grunt.loadNpmTasks('grunt-serve');

};
