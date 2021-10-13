
const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('sass')),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber')

const app = 'app/',
  dist = 'dist/';

const config = {
  app: {
    html: app + 'pug/index.pug',
    style: app + 'scss/**/*.scss',
    js: app + 'js/**/*.*',
    fonts: app + 'fonts/**/*.*',
    img: app + 'img/**/*.*'
  },
  dist: {
    html: dist,
    style: dist + 'css/',
    js: dist + 'js/',
    fonts: dist + 'fonts/',
    img: dist + 'img/'
  },
  watch: {
    html: app + 'pug/**/*.pug',
    style: app + 'scss/**/*.scss',
    js: app + 'js/**/*.*',
    fonts: app + 'fonts/**/*.*',
    img: app + 'img/**/*.*'
  }
}

const webServer = () => {
  browserSync.init({
    server: {
      baseDir: dist
    },
    port: 9000,
    host: 'localhost',
    notify: false
  })
}

const watchFiles = () => {
  gulp.watch([config.watch.html], gulp.series(pugTask));
  gulp.watch([config.watch.style], gulp.series(scssTask));
  gulp.watch([config.watch.js], gulp.series(jsTask));
  gulp.watch([config.watch.fonts], gulp.series(fontsTask));
  gulp.watch([config.watch.img], gulp.series(imgTask));
}

const pugTask = () => {
  return gulp.src(config.app.html)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'PUG',
          message: error.message
        }
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.dist.html))
    .pipe(browserSync.reload({
      stream: true
    }))
}
const scssTask = () => {
  return gulp.src(config.app.style)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'Style',
          message: error.message
        }
      })
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dist.style))
    .pipe(browserSync.reload({
      stream: true
    }))
}
const jsTask = () => {
  return gulp.src(config.app.js)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'JS',
          message: error.message
        }
      })
    }))
    .pipe(gulp.dest(config.dist.js))
    .pipe(browserSync.reload({
      stream: true
    }))
}
const fontsTask = () => {
  return gulp.src(config.app.fonts)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'fonts',
          message: error.message
        }
      })
    }))
    .pipe(gulp.dest(config.dist.fonts))
    .pipe(browserSync.reload({
      stream: true
    }))
}
const imgTask = () => {
  return gulp.src(config.app.img)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'JS',
          message: error.message
        }
      })
    }))
    .pipe(gulp.dest(config.dist.img))
    .pipe(browserSync.reload({
      stream: true
    }))
}

const start = gulp.series(pugTask, scssTask, jsTask, fontsTask, imgTask);
exports.default = gulp.parallel(start, watchFiles, webServer)