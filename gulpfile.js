// var gulp = require("gulp"),
// 	browserSync = require('browser-sync');
// 	sass = require('gulp-sass'); //Подключаем Sass пакет

// gulp.task('server', function() {
// 	browserSync({
// 		port: 9000,
// 		server: {
// 			baseDir: 'app'
// 		}
// 	});
// });

// gulp.task('watch', function () {
// 	gulp.watch([
// 		'app/*.html',
// 		'app/js/**/*.js',
// 		'app/css/**/*.css'
// 	]).on('change', browserSync.reload);
// });

// gulp.task('default', ['server', 'watch']);

var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
})

gulp.task('default', ['browser-sync', 'sass', 'watch']);