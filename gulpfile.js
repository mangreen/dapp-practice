var gulp = require('gulp')
var webpackStream = require('webpack-stream')
var cleandest = require('gulp-dest-clean')
var shell = require('gulp-shell')
var nodemon = require('nodemon');

const webpackConfig = require('./webpack.config')

gulp.task('watch', function () {
    gulp.watch([
        'views/**/*.html', 
        'app/**/*.vue', 
        'app/**/*.js', 
        'app/**/*.json', 
        'app/**/*.css'
    ], ['webpack']);
});

gulp.task('webpack', function () {
	return gulp.src('app/main.js')
		.pipe(cleandest('public/dist'))
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest('public'))
		//.pipe(shell('npm run watch'))
});

gulp.task('clean', () => {
	return gulp.src('app/main.js')
		.pipe(cleandest('public/dist'))
});

gulp.task('develop', function() {

    // not a good way but gulp-nodemon sucks xD
    nodemon({
        script: 'index.js',
        ext: 'js json vue'
    });

    nodemon.on('start', function() {
        console.log('App has started');
    }).on('quit', function() {
        console.log('App has quit');
    }).on('restart', function(files) {
        console.log('App restarted due to: ', files);
    });

});

gulp.task('default', ['webpack', 'develop', 'watch'])
