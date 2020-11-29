const fs = require('fs');
const {task, src, dest, series} = require('gulp');
const zip = require('gulp-zip');
const replace = require('gulp-replace');
const del = require('del');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

/**
 * ------------------------------------------------------------------------
 * Changes
 * ------------------------------------------------------------------------
 */

const change = {
  startersBloggerpackVersion: function() {
    return src('starters/blogger/**/package.json')
      .pipe(replace('"@alotool/alotool-cli": "^' + pkg.version_current + '"', '"@alotool/alotool-cli": "^' + pkg.version + '"'))
      .pipe(dest('starters/blogger', {
        overwrite: true
      }))
  },
  startersDownloadVersion: function() {
    return src('starters/blogger/**/README.md')
      .pipe(replace(pkg.version_current, pkg.version))
      .pipe(dest('starters/blogger', {
        overwrite: true
      }))
  },
  packageCurrentVersion: function() {
    return src('package.json')
      .pipe(replace('"version_current": "' + pkg.version_current + '"', '"version_current": "' + pkg.version + '"'))
      .pipe(dest('.', {
        overwrite: true
      }))
  }
};

exports.change_version = series(
  change.startersBloggerpackVersion,
  change.startersDownloadVersion,
  change.packageCurrentVersion
);

/**
 * ------------------------------------------------------------------------
 * Zip
 * ------------------------------------------------------------------------
 */

const starters = {
  blk: {
    name: 'blank',
    files: ['starters/blogger/blank/**/{*,.*}']
  },
  bs4: {
    name: 'bootstrap4',
    files: ['starters/blogger/bootstrap4/**/{*,.*}']
  }
};

const zipStarters = Object.keys(starters);

zipStarters.forEach(function(taskName) {
  task(taskName, function() {
    starters[taskName].files.push('!starters/blogger/**/node_modules/**');
    starters[taskName].files.push('!starters/blogger/**/package-lock.json');

    return src(starters[taskName].files)
      .pipe(zip(starters[taskName].name + '-' + pkg.version + '.zip'))
      .pipe(dest('starters-zip'));
  });
});

function cleanStartersZip(cb) {
  del.sync('starters-zip');
  cb();
}

exports.zip_starters = series(
  cleanStartersZip,
  zipStarters.map(function(name) {
    return name;
  })
);
