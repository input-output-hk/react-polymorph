const cpy = require('cpy');

const copyAllThemeFiles = (rename) => cpy(['**/*.scss', '**/*.svg'], '../../lib/themes', {
  cwd: 'source/themes',
  rename,
  parents: true,
});

const copyScssFilesAsModules = (rename) => cpy('**/*.scss', '../../lib/themes', {
  cwd: 'source/themes',
  rename,
  parents: true,
});

// Copy sass and svg files "normally" to lib folder:
copyAllThemeFiles();
// Copy only sass files again as module.scss files:
copyScssFilesAsModules((basename) => {
  const fileName = basename.substring(0, basename.indexOf('.scss'));
  return `${fileName}.module.scss`;
});
