// @flow

// the baseStyles obj will be composed with the stylesToAdd obj
// activeClasses is an array of the classes within stylesToAdd
// that should be added to baseStyles
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
