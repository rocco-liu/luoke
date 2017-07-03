const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('generate', shell.task('node ./lib/postGenerator.js'));
gulp.task('serve', shell.task('node index.js'));
gulp.task('default', ['generate', 'serve']);