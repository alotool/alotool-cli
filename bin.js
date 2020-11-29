#!/usr/bin/env node

const spawn = require('cross-spawn');
const argv = process.argv.slice(2);
const cwd = process.cwd();
const gulpfile = 'node_modules/@alotool/alotool-cli/gulpfile.blogger.js';

/*--------------------------------------------------------------------*/
/*---------- GULPFILE FOR BLOGGER
/*--------------------------------------------------------------------*/
// build
if (argv[0] === 'build' && argv.length === 1) {
  spawn('gulp', ['build', '--gulpfile', gulpfile, '--cwd', cwd], {
    stdio: 'inherit',
    cwd: cwd
  });
}
// watch
else if (argv[0] === 'watch' && argv.length === 1) {
  spawn('gulp', ['watch', '--gulpfile', gulpfile, '--cwd', cwd], {
    stdio: 'inherit',
    cwd: cwd
  });
} else {
  console.error('Command error.');
  process.exit();
}
