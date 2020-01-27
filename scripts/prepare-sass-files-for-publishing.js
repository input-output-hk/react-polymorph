const cpy = require('cpy');

const copy = (rename) => cpy('**/*.scss', '../../lib/themes', {
  cwd: 'source/themes',
  rename,
  parents: true,
});

// Copy sass files "normally" to lib folder:
copy();
// Copy them again as module.scss files:
copy((basename) => {
  const fileName = basename.substring(0, basename.indexOf('.scss'));
  return `${fileName}.module.scss`;
});
