// Importar las funciones específicas de la API de gulp que vamos a utilizar
const {src, dest, series, parallel, watch} = require('gulp');
// Importar los paquetes con los que vamos a trabajar
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html',
}

function helloWorldTask(result) {
    console.log("hello world! :3");
    result();
}

/**
 * Compilar los archivos de sass en estilos en cascada para el navegador (CSS)
 */
function scssTask() {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('dist/css'));
}

/**
 * Observar cambios en los archivos de sass para compilarlos automaticamente
 */
function watchTask() {
    watch(
        [files.scssPath, files.htmlPath],
        series(scssTask, reloadTask)
    )
}

function serveTask(d) {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    d();
}

function reloadTask(d) {
    browserSync.reload();
    d();
}

//Dependencias
var    gulp = require('gulp'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
  minifycss =require('gulp-minify-css');

gulp.task('optimiza-web', ['minify-js', 'minify-css']);

gulp.task('minify-js', function () {
  gulp.src('source/*.js')
  .pipe(concat('application.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/'))
});

gulp.task('minify-css', function () {
  gulp.src('source/*.css')
  .pipe(concat('application.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('build/'))
});

exports.default = series(scssTask, serveTask, watchTask);