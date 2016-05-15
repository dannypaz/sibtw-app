const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const files = {
  server: [
    './src/server.js',
    './src/**/*.js',
    './src/**/**/*.js',
  ],
  client: './src/client.js',
  views: './src/_shared/layout/*.html',
  images: [
    './src/**/*.jpg',
    './src/**/**/*.jpg',
  ],
  vendor: [
    './node_modules/react/dist/react.min.js',
    './node_modules/react-dom/dist/react-dom.min.js',
    './node_modules/purecss/build/pure-min.css',
    './node_modules/purecss/build/grids-responsive-min.css',
    './node_modules/sanitize.css/dist/sanitize.min.css',
    './node_modules/sanitize.css/dist/sanitize.min.css.map',
    './node_modules/font-awesome/css/font-awesome.min.css',
    './node_modules/font-awesome/css/font-awesome.css.map',
  ],
  styles: [
    './src/**/*.css',
    './src/**/**/*.css',
    './src/**/**/**/*.css',
  ],
  favicon: './src/_shared/layout/favicon.ico',
};

gulp.task('watch', ['clean'], () => {
  gulp.start('watch-dev');
});

gulp.task('watch-dev', ['build'], () => {
  // Watch all server files and build on changes
  gulp.watch(files.server, ['client', 'server']);
  gulp.watch(files.client, ['client', 'server']);
  gulp.watch(files.styles, ['styles']);
  gulp.watch(files.views, ['views']);
});

// Processes all nodejs server files
gulp.task('server', () => {
  return gulp.src(files.server)
    .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015', 'react', 'stage-0'],
      }))
      .on('error', (err) => {
        console.error('JSX Error in ' + err.fileName);
        console.error(err.message);
      })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log);
});

// Build and minify react bundle for client-side
gulp.task('client', () => {
  const props = {
    entries: [files.client],
    debug: true,
  };

  return browserify(props)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .on('error', (err) => {
      console.error('Browserify Error: ', err);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/public/js/'))
    .on('error', gutil.log);
});

// Processes our views/templates
gulp.task('views', () => {
  return gulp.src(files.views)
    .pipe(gulp.dest('dist/_shared/layout/'))
    .on('error', gutil.log);
});

// Adds fall-back vendor libraries to the public
// dist folder. This endpoint is specified in the express
// configuration.
gulp.task('vendor', () => {
  return gulp.src(files.vendor)
    .pipe(gulp.dest('dist/public/vendor'))
    .on('error', gutil.log);
});

gulp.task('favicon', () => {
  return gulp.src(files.favicon)
    .pipe(gulp.dest('dist/public/'))
    .on('error', gutil.log);
});

gulp.task('images', () => {
  return gulp.src(files.images)
    .pipe(gulp.dest('dist/public/images/'))
    .on('error', gutil.log);
});

gulp.task('styles', () => {
  const processors = [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
    require('postcss-simple-vars'),
  ];

  return gulp.src(files.styles)
    .pipe(sourcemaps.init())
      .pipe(postcss(processors))
        .on('error', (err) => {
          console.error('CSS Error: ', err);
        })
      .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/public/css'))
    .on('error', gutil.log);
});

gulp.task('clean', () => {
  return del(['dist/**'], { force: true });
});

const tasks = [
  'server',
  'views',
  'vendor',
  'styles',
  'favicon',
  'client',
  'images',
];

gulp.task('build', tasks);
gulp.task('default', tasks);
