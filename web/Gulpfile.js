'use strict'

const gulp = require('gulp')
const del = require('del')
const tsc = require('gulp-typescript')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const tsProject = tsc.createProject('tsconfig.json')
const tslint = require('gulp-tslint')


// Remove build directory.
gulp.task('clean', (cb) => {
  return del(['build'], cb)
})

gulp.task('styles', () => {
  return gulp.src('src/app/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/app/styles'))
})

// Lint all custom TypeScript files.
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report())
})

// Compile TypeScript sources and create sourcemaps in build directory.
gulp.task('compile', ['tslint'], () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
  return tsResult.js
    .pipe(sourcemaps.write('.', { sourceRoot: '/src' }))
    .pipe(gulp.dest('build'))
})

// Copy all resources that are not TypeScript files into build directory.
gulp.task('resources', () => {
  return gulp.src(['src/**/*', '!**/*.ts', '!**/*.scss'])
    .pipe(gulp.dest('build'))
})

// Copy all required libraries into build directory.
gulp.task('libs', () => {
  return gulp.src([
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**/*.js',
        'zone.js/dist/**',
        '@angular/**/bundles/**'
      ], { cwd: 'node_modules/**' })
      .pipe(gulp.dest('build/lib'))
})

// Watch for changes in TypeScript, HTML and SCSS files.
gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts'], ['compile'])
  gulp.watch(['src/**/*.scss'], ['styles'])
  gulp.watch(['src/**/*.html', 'src/**/*.css'], ['resources'])
})

// Build the project.
gulp.task('build', ['compile', 'resources', 'libs', 'styles'])