const fs = require('fs');
const path = require('path');
const {src, dest, series} = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const stripIndent = require('strip-indent');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const header = require('gulp-header');
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

  gulpInst.task('layout-compile', function() {
    return src(skinOpts.compile.src)
      .pipe(header(banner.text, banner.data))
      .pipe(rename(skinOpts.compile.filename))
      .pipe(trim())
      .pipe(dest(skinOpts.compile.dest, {
        overwrite: true
      }));
  });

  gulpInst.task('layout-tasks', series(
    'layout-compile'
  ));

};

module.exports = layoutRegistry;