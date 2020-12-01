const fs = require('fs');
const path = require('path');
const {src, dest, series} = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const stripIndent = require('strip-indent');
const del = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const stripCssComments = require('gulp-strip-css-comments');
const prettyData = require('gulp-pretty-data');

// extract
const extract = require('../../lib/extract');

// lint
const stylelint = require('gulp-stylelint');

// compile
const header = require('gulp-header');
const skinImportBeautifier = require('../../lib/skin-import-beautifier');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const trim = require('../../lib/trim');

const config = require('../../config');

const defaults = {
  src: {
    dir: config.skin.src.dir,
    filename: config.skin.src.filename
  },
  build: {
    dir: config.skin.build.dir,
    filename: config.skin.build.filename
  }
};

function skinRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts || defaults;
}

util.inherits(skinRegistry, defaultRegistry);

skinRegistry.prototype.init = function (gulpInst) {
  const opts = this.opts;

  const skinOpts = {
    extract: {
      src: [
        path.join(process.cwd(), '**/*.njk'),
        path.join(process.cwd(), 'node_modules/bloggerpack-plugin-*/**/*.njk'),
        '!' + path.join(process.cwd(), 'node_modules/**/*.njk')
      ],
      filename: 'skin-in-template.css',
      dest: path.join(process.cwd(), opts.src.dir),
      opts: {
        start: config.skin.tag.start,
        end: config.skin.tag.end,
        header: `/*
# ==========================================================================
# Template path: <filepath>
# ==========================================================================
*/`,
        footer: '',
        emptyMessage: '/* Skin-in-Template is empty */'
      }
    },
    lint: {
      src: [
        path.join(process.cwd(), opts.src.dir, '**/*.css')
      ],
      configFile: path.join(process.cwd(), config.configFile.stylelint)
    },
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

  gulpInst.task('skin-extract-clean', function (cb) {
    del.sync(path.join(process.cwd(), skinOpts.extract.dest, skinOpts.extract.filename));
    cb();
  });
  gulpInst.task('skin-extract', function () {
    return src([...skinOpts.extract.src], {allowEmpty: true})
      .pipe(extract(skinOpts.extract.opts))
      .pipe(concat(skinOpts.extract.filename))
      .pipe(dest(skinOpts.extract.dest, {overwrite: true}));
  });

  gulpInst.task('skin-lint', function (cb) {
    if (fs.existsSync(path.join(process.cwd(), config.configFile.stylelint))) {
      return src([...skinOpts.lint.src], {allowEmpty: true})
        .pipe(stylelint({
          configFile: skinOpts.lint.configFile,
          ignoreDisables: false,
          reportNeedlessDisables: false,
          reporters: [
            {
              formatter: 'string',
              console: true
            }
          ],
          reportOutputDir: '',
          debug: false,
          failAfterError: true
        }));
    } else {
      console.log('Skin not linted (No "' + path.join(config.configFile.stylelint) + '" found)');
      cb();
    }
  });

  gulpInst.task('skin-compile', function () {
    return src(skinOpts.compile.src)
      .pipe(skinImportBeautifier())
      .pipe(postcss([
        atImport({
          skipDuplicates: false
        }),
        autoprefixer({
          cascade: false
        })
      ]))
      .pipe(replace(/\/\*[^*]*Template\spath:[^*]*\*\/\n\n/g, ''))
      .pipe(replace(/\/\*[^*]*Template\spath:[^*]*\*\/\n/g, ''))
      .pipe(replace(/\/\* Skin-in-Template is empty \*\/\n\n/g, ''))
      .pipe(replace(/\/\* Skin-in-Template is empty \*\//g, ''))
      .pipe(header(banner.text, banner.data))
      .pipe(rename(skinOpts.compile.filename))
      .pipe(trim())
      .pipe(dest(skinOpts.compile.dest, {overwrite: true}));
  });

  gulpInst.task('skin-build', function() {
    return src(opts.src.dir + '/*.css')
      .pipe(stripCssComments())
      .pipe(prettyData({type: 'minify', preserveComments: true}))
      .pipe(header(banner.text, banner.data))
      .pipe(trim())
      .pipe(dest(opts.build.dir, {
        overwrite: true
      }));
  });

  gulpInst.task('skin-tasks', series(
    'skin-extract-clean',
    'skin-extract',
    'skin-lint',
    'skin-compile'
  ));
};

module.exports = skinRegistry;
