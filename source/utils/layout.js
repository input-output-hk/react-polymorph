// @flow
export const formatTemplateAreas = (areas: Array<''>) => {
  if (!areas || !areas.length) { return; }

  return areas.reduce((template, row, index) => {
    if (!index) { return `'${row}'`; }
    return `${template} '${row}'`;
  }, '');
};

export const composeBaseStyles = (
  baseStyles: Object,
  stylesToAdd: Object,
  activeClasses: Array
) => {
  if (!activeClasses || !activeClasses.length) { return baseStyles; }

  const composedBase = { ...baseStyles };

  activeClasses.forEach(className => {
    if (Object.hasOwnProperty.call(stylesToAdd, className) && stylesToAdd[className]) {
      composedBase.base += ` ${stylesToAdd[className]}`;
    }
  });

  return composedBase;
};
