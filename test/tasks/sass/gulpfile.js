const {series, registry} = require('gulp');

const sassRegistry = require('../../../tasks/blogger/sass');
registry(new sassRegistry());

const cleanRegistry = require('../../../tasks/blogger/clean');
registry(new cleanRegistry());

// gulp build --gulpfile test/tasks/sass/gulpfile.js
exports.build = series('clean', 'sass-tasks');
