const fs = require('fs');
const path = require('path');
const {series, registry} = require('gulp');
const gulpWatch = require('gulp').watch;
const config = require('./config');

const tasks = [];

/**
 * ------------------------------------------------------------------------
 * Sass tasks
 * ------------------------------------------------------------------------
 */

const sassRegistry = require('./tasks/blogger/sass');
registry(new sassRegistry());

const sassTasks = series(
  'sass-extract-clean',
  'sass-extract',
  'sass-lint',
  'sass-compile'
);

if (fs.existsSync(path.join(config.sass.src.dir, config.sass.src.filename))) {
  tasks.push(sassTasks);
}

/**
 * ------------------------------------------------------------------------
 * Skin tasks
 * ------------------------------------------------------------------------
 */

const skinRegistry = require('./tasks/blogger/skin');
registry(new skinRegistry());

const skinTasks = series(
  'skin-extract-clean',
  'skin-extract',
  'skin-lint',
  'skin-compile'
);

if (fs.existsSync(path.join(config.skin.src.dir, config.skin.src.filename))) {
  tasks.push(skinTasks);
}

/**
 * ------------------------------------------------------------------------
 * layout tasks
 * ------------------------------------------------------------------------
 */

const layoutRegistry = require('./tasks/blogger/layout');
registry(new layoutRegistry());

const layoutTasks = series(
  'layout-compile'
);

if (fs.existsSync(path.join(config.layout.src.dir, config.layout.src.filename))) {
  tasks.push(layoutTasks);
}

/**
 * ------------------------------------------------------------------------
 * JS tasks
 * ------------------------------------------------------------------------
 */

const jsRegistry = require('./tasks/blogger/js');
registry(new jsRegistry());

const jsTasks = series(
  'js-extract-clean',
  'js-extract',
  'js-lint',
  'js-compile'
);

if (fs.existsSync(path.join(config.js.src.dir, config.js.src.filename))) {
  tasks.push(jsTasks);
}

/**
 * ------------------------------------------------------------------------
 * Template tasks
 * ------------------------------------------------------------------------
 */

const templateRegistry = require('./tasks/blogger/template');
registry(new templateRegistry());

const templateTasks = series(
  'template-compile-main',
  'template-compile-variant'
);

if (fs.existsSync(path.join(config.template.src.dir, config.template.src.filename))) {
  tasks.push(templateTasks);
}

/**
 * ------------------------------------------------------------------------
 * Clean tasks
 * ------------------------------------------------------------------------
 */

const cleanRegistry = require('./tasks/blogger/clean');
registry(new cleanRegistry());

/**
 * ------------------------------------------------------------------------
 * Task Definitions
 * ------------------------------------------------------------------------
 */

if (tasks.length === 0 || tasks.includes(templateTasks) === false) {
  const errorTasks = function(cb) {
    cb(new Error('Require ' + path.join(config.template.src.dir, config.template.src.filename)));
  };
  errorTasks.displayName = 'error';
  tasks.splice(0, tasks.length);
  tasks.push(errorTasks);
} else {
  tasks.unshift('clean');
}

const build = series(tasks);

function watch() {
  return gulpWatch([
    '**/*',
    '!' + path.join(config.sass.src.dir, '_sass-in-template.scss'),
    '!' + path.join(config.skin.src.dir, 'skin-in-template.css'),
    '!' + path.join(config.js.src.dir, 'js-in-template.js'),
    '!dist',
    '!node_modules',
    '!src/dist',
  ], build);
}

exports.build = build;
exports.watch = watch;
