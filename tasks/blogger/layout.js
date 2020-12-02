const fs = require('fs');
const path = require('path');
const {src, dest, series} = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const stripIndent = require('strip-indent');
const header = require('gulp-header');
const stripCssComments = require('gulp-strip-css-comments');
const prettyData = require('gulp-pretty-data');
const filter = require('gulp-filter');

const trim = require('../../lib/trim');
const config = require('../../config');

const defaults = {
  src: {
    dir: config.layout.src.dir,
    filename: config.layout.src.filename
  },
  build: {
    dir: config.layout.build.dir,
    filename: config.layout.build.filename
  }
};

function layoutRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts || defaults;
}

util.inherits(layoutRegistry, defaultRegistry);

layoutRegistry.prototype.init = function(gulpInst) {
  const opts = this.opts;

  const skinOpts = {
    compile: {
      src: path.join(opts.src.dir, opts.src.filename),
      filename: opts.build.filename,
      dest: path.join(process.cwd(), opts.build.dir),
      banner: {
        text: path.join(process.cwd(), config.configFile.banner),
        data: path.join(process.cwd(), config.configFile.data)
      }
    }
  };

  const banner = {
    text: stripIndent(
      fs.readFileSync(skinOpts.compile.banner.text, 'utf8').trim()
    ) + '\n',
    data: {
      data: require(skinOpts.compile.banner.data),
      pkg: require(path.join(process.cwd(), 'package.json'))
    }
  };

  gulpInst.task('layout-build', function() {
    const cssFilter = filter('**/*.minify.css', {
      restore: true
    });
    return src(opts.src.dir + '/*.css')
      .pipe(stripCssComments())
      .pipe(cssFilter)
      .pipe(prettyData({type: 'minify', preserveComments: true}))
      .pipe(cssFilter.restore)
      .pipe(header(banner.text, banner.data))
      .pipe(trim())
      .pipe(dest(opts.build.dir, {
        overwrite: true
      }));
  });
  gulpInst.task('layout-tasks', series(
    'layout-build'
  ));

};

module.exports = layoutRegistry;