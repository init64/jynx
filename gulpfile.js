const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass')(require('sass')),
  rename = require('gulp-rename'),
  vueComponent = require('gulp-vue-single-file-component');


const app = 'client/',
  dist = 'dist/client/';

const config = {
  app: {
    js: app + 'src/**/*.js',
    vue: app + 'src/**/*.vue',
    fonts: app + 'src/assets/fonts/**/*.*',
    img: app + 'src/assets/img/**/*.*',
    style: app + `src/assets/styles/**/*.*`,
    html: app + 'public/index.html',
  },
  dist: {
    html: dist,
    style: dist + 'styles/',
    js: dist + 'js/',
    fonts: dist + 'fonts/',
    img: dist + 'img/',
  },
  watch: {
    js: app + 'src/**/*.js',
    vue: app + 'src/**/*.vue',
    fonts: app + 'src/assets/fonts/**/*.*',
    img: app + 'src/assets/img/**/*.*',
    style: app + 'src/assets/styles/**/*.*',
    html: app + 'public/index.html',
  },
};

const watchFiles = () => {
  gulp.watch([config.watch.html], gulp.series(htmlTask));
  gulp.watch([config.watch.style], gulp.series(scssTask));
  gulp.watch([config.watch.vue], gulp.series(vueTask));
  gulp.watch([config.watch.js], gulp.series(jsTask));
  gulp.watch([config.watch.fonts], gulp.series(fontsTask));
  gulp.watch([config.watch.img], gulp.series(imgTask));
};

const htmlTask = () => {
  return gulp.src(config.app.html)
    .pipe(gulp.dest(config.dist.html))
    .pipe(browserSync.reload({
      stream: true,
    }));
};

const scssTask = () => {
  return gulp.src(config.app.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dist.style))
    .pipe(browserSync.reload({
      stream: true,
    }));
};

const jsTask = () => {
  return gulp.src(config.app.js)
    .pipe(gulp.dest(config.dist.js))
    .pipe(browserSync.reload({
      stream: true,
    }));
};

const vueTask = () => {
  return gulp.src(config.app.vue)
    .pipe(vueComponent({ loadCssMethod: 'loadCss' }))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest(config.dist.js))
    .pipe(browserSync.reload({
      stream: true,
    }));
};

const fontsTask = () => {
  return gulp.src(config.app.fonts)
    .pipe(gulp.dest(config.dist.fonts))
    .pipe(browserSync.reload({
      stream: true,
    }));
};

const imgTask = () => {
  return gulp.src(config.app.img)
    .pipe(gulp.dest(config.dist.img))
    .pipe(browserSync.reload({
      stream: true,
    }));
};
const build = gulp.series(htmlTask, scssTask, jsTask, fontsTask, imgTask, vueTask);

gulp.task('build', build);
gulp.task('dev', gulp.parallel(build, watchFiles));