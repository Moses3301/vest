const fs = require('fs');
const path = require('path');
const { ROOT_PATH } = require('../config');
const aliases = require('../util/moduleAliases');

const config = {
  compilerOptions: {
    baseUrl: '.',
    paths: aliases.relative.reduce(
      (paths, [name, file]) => Object.assign(paths, { [name]: [file] }),
      {}
    ),
  },
  exclude: ['node_modules', 'dist'],
};

fs.writeFileSync(
  path.join(ROOT_PATH, 'jsconfig.json'),
  JSON.stringify(config, null, 2),
  'utf8'
);
