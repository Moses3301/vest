const path = require('path');
const glob = require('glob');

const { ROOT_PATH } = require('../config');

const basename = file => {
  const withExt = path.basename(file);

  if (
    withExt.startsWith('index') ||
    withExt.startsWith('spec') ||
    withExt.endsWith('.test.js') ||
    withExt.endsWith('.spec.js') ||
    withExt.startsWith('constants')
  ) {
    return;
  }

  return withExt.substr(0, withExt.lastIndexOf('.'));
};

const lookup = './packages/{vest,n4s}/src/**/*.{js,mjs}';

const absolute = glob.sync(lookup, {
  cwd: ROOT_PATH,
  absolute: true,
});

const relative = glob.sync(lookup, {
  cwd: ROOT_PATH,
  absolute: false,
});

const genMap = files =>
  files.reduce((haste, file) => {
    const name = basename(file);

    if (!name) {
      return haste;
    }

    return haste.concat([[name, file]]);
  }, []);

const absoluteHaste = genMap(absolute);
const relativeHaste = genMap(relative);

module.exports = { absolute: absoluteHaste, relative: relativeHaste };
