const {series, registry} = require('gulp');

const skinRegistry = require('../../../tasks/blogger/skin');
registry(new skinRegistry());

const cleanRegistry = require('../../../tasks/blogger/clean');
registry(new cleanRegistry());

// gulp build --gulpfile test/tasks/skin/gulpfile.js
exports.build = series('clean', 'skin-tasks');
